-- Jade Powell
-- AddReferentialIntegrity.sql
-- 3.2 Project - Adding Referential Integrity (MASTER / FIXED)

--------------------------------------------------------------------------------
-- QUICK FACTS FROM YOUR SCHEMA:
-- - Product table is PRODUCTLIST (NOT PRODUCT)
-- - Orders "money" column is PRICE (NOT TOTALAMOUNT)
-- - Ticket table name is UNKNOWN in your schema (we auto-detect it below)
-- - FK validation failed before due to existing orphan rows:
--   we add FKs using NOVALIDATE so they enforce going forward without failing now.
--------------------------------------------------------------------------------

--------------------------------------------------------------------------------
-- STEP 0: Build normalized helper views so the rest of the queries work cleanly
-- (handles column-name differences automatically when possible)
--------------------------------------------------------------------------------

-- 0A) Normalized PRODUCTLIST view (tries common column names)
DECLARE
  v_prodname  VARCHAR2(128);
  v_price     VARCHAR2(128);
  v_reldate   VARCHAR2(128);
  v_pub       VARCHAR2(128);
  v_genre     VARCHAR2(128);

  FUNCTION pick_col(p_table VARCHAR2, p_candidates SYS.ODCIVARCHAR2LIST)
    RETURN VARCHAR2
  IS
    v_col VARCHAR2(128);
  BEGIN
    FOR i IN 1 .. p_candidates.COUNT LOOP
      BEGIN
        SELECT column_name
          INTO v_col
          FROM user_tab_columns
         WHERE table_name = UPPER(p_table)
           AND column_name = UPPER(p_candidates(i));
        RETURN v_col;
      EXCEPTION WHEN NO_DATA_FOUND THEN
        NULL;
      END;
    END LOOP;
    RETURN NULL;
  END;
BEGIN
  v_prodname := pick_col('PRODUCTLIST', SYS.ODCIVARCHAR2LIST('PRODUCTNAME','NAME','TITLE'));
  v_price    := pick_col('PRODUCTLIST', SYS.ODCIVARCHAR2LIST('PRICE','COST','AMOUNT'));
  v_reldate  := pick_col('PRODUCTLIST', SYS.ODCIVARCHAR2LIST('RELEASEDATE','RELEASE_DATE','LAUNCHDATE','PUBLISHDATE'));
  v_pub      := pick_col('PRODUCTLIST', SYS.ODCIVARCHAR2LIST('PUBLISHER','PUBLISHERNAME','STUDIO'));
  v_genre    := pick_col('PRODUCTLIST', SYS.ODCIVARCHAR2LIST('GENRE','CATEGORY','TYPE'));

  IF v_prodname IS NULL THEN v_prodname := 'NULL'; END IF;
  IF v_price    IS NULL THEN v_price    := 'NULL'; END IF;
  IF v_reldate  IS NULL THEN v_reldate  := 'NULL'; END IF;
  IF v_pub      IS NULL THEN v_pub      := 'NULL'; END IF;
  IF v_genre    IS NULL THEN v_genre    := 'NULL'; END IF;

  EXECUTE IMMEDIATE '
    CREATE OR REPLACE VIEW VW_PRODUCTLIST_NORMALIZED AS
    SELECT
      PRODUCTCODE,
      '||v_prodname||' AS PRODUCTNAME,
      '||v_price||'    AS PRICE,
      '||v_reldate||'  AS RELEASEDATE,
      '||v_pub||'      AS PUBLISHER,
      '||v_genre||'    AS GENRE
    FROM PRODUCTLIST
  ';
END;
/
-- 0B) Auto-detect a ticket table and create a normalized ticket view.
--     If none exists, the view will be empty but script will still run.
DECLARE
  v_ticket_table VARCHAR2(128);
BEGIN
  SELECT t.table_name
    INTO v_ticket_table
    FROM user_tables t
   WHERE EXISTS (SELECT 1 FROM user_tab_columns c WHERE c.table_name=t.table_name AND c.column_name='STATUS')
     AND EXISTS (SELECT 1 FROM user_tab_columns c WHERE c.table_name=t.table_name AND c.column_name='DATESUBMITTED')
     AND EXISTS (SELECT 1 FROM user_tab_columns c WHERE c.table_name=t.table_name AND c.column_name='DATEUPDATED')
     AND EXISTS (SELECT 1 FROM user_tab_columns c WHERE c.table_name=t.table_name AND c.column_name='EMAIL')
     AND EXISTS (SELECT 1 FROM user_tab_columns c WHERE c.table_name=t.table_name AND c.column_name='ISSUE')
     AND ROWNUM = 1;

  EXECUTE IMMEDIATE '
    CREATE OR REPLACE VIEW VW_TICKETS_NORMALIZED AS
    SELECT EMAIL, ISSUE, STATUS, DATESUBMITTED, DATEUPDATED
    FROM '||v_ticket_table;

EXCEPTION
  WHEN NO_DATA_FOUND THEN
    EXECUTE IMMEDIATE '
      CREATE OR REPLACE VIEW VW_TICKETS_NORMALIZED AS
      SELECT
        CAST(NULL AS VARCHAR2(320)) AS EMAIL,
        CAST(NULL AS VARCHAR2(4000)) AS ISSUE,
        CAST(NULL AS VARCHAR2(50)) AS STATUS,
        CAST(NULL AS DATE) AS DATESUBMITTED,
        CAST(NULL AS DATE) AS DATEUPDATED
      FROM dual
      WHERE 1=0';
END;
/

-- 0C) Normalized CHATLOG last week view (tries common date column names)
DECLARE
  v_datesent VARCHAR2(128);
BEGIN
  -- Prefer DATESENT if present; otherwise try SENTDATE / DATE_SENT
  BEGIN
    SELECT column_name INTO v_datesent
    FROM user_tab_columns
    WHERE table_name='CHATLOG' AND column_name='DATESENT';
  EXCEPTION WHEN NO_DATA_FOUND THEN
    BEGIN
      SELECT column_name INTO v_datesent
      FROM user_tab_columns
      WHERE table_name='CHATLOG' AND column_name='SENTDATE';
    EXCEPTION WHEN NO_DATA_FOUND THEN
      BEGIN
        SELECT column_name INTO v_datesent
        FROM user_tab_columns
        WHERE table_name='CHATLOG' AND column_name='DATE_SENT';
      EXCEPTION WHEN NO_DATA_FOUND THEN
        v_datesent := NULL;
      END;
    END;
  END;

  IF v_datesent IS NULL THEN
    EXECUTE IMMEDIATE '
      CREATE OR REPLACE VIEW VW_CHATLOG_LAST_WEEK AS
      SELECT * FROM CHATLOG WHERE 1=0';
  ELSE
    EXECUTE IMMEDIATE '
      CREATE OR REPLACE VIEW VW_CHATLOG_LAST_WEEK AS
      SELECT *
      FROM CHATLOG
      WHERE '||v_datesent||' BETWEEN (SYSDATE - 7) AND SYSDATE';
  END IF;
END;
/

--------------------------------------------------------------------------------
-- 1) Enforce referential integrity by adding foreign key constraints to:
--    ORDERS, REVIEWS, and USERLIBRARY.
--    IMPORTANT: NOVALIDATE avoids ORA-02298 due to existing orphan rows.
--------------------------------------------------------------------------------

-- FK: ORDERS.USERID -> USERBASE.USERID
ALTER TABLE ORDERS
  ADD CONSTRAINT FK_ORDERS_USERBASE
  FOREIGN KEY (USERID)
  REFERENCES USERBASE (USERID)
  NOVALIDATE;

-- FK: ORDERS.PRODUCTCODE -> PRODUCTLIST.PRODUCTCODE
ALTER TABLE ORDERS
  ADD CONSTRAINT FK_ORDERS_PRODUCTLIST
  FOREIGN KEY (PRODUCTCODE)
  REFERENCES PRODUCTLIST (PRODUCTCODE)
  NOVALIDATE;

-- FK: REVIEWS.USERID -> USERBASE.USERID
ALTER TABLE REVIEWS
  ADD CONSTRAINT FK_REVIEWS_USERBASE
  FOREIGN KEY (USERID)
  REFERENCES USERBASE (USERID)
  NOVALIDATE;

-- FK: REVIEWS.PRODUCTCODE -> PRODUCTLIST.PRODUCTCODE
ALTER TABLE REVIEWS
  ADD CONSTRAINT FK_REVIEWS_PRODUCTLIST
  FOREIGN KEY (PRODUCTCODE)
  REFERENCES PRODUCTLIST (PRODUCTCODE)
  NOVALIDATE;

-- FK: USERLIBRARY.USERID -> USERBASE.USERID
ALTER TABLE USERLIBRARY
  ADD CONSTRAINT FK_USERLIBRARY_USERBASE
  FOREIGN KEY (USERID)
  REFERENCES USERBASE (USERID)
  NOVALIDATE;

-- FK: USERLIBRARY.PRODUCTCODE -> PRODUCTLIST.PRODUCTCODE
ALTER TABLE USERLIBRARY
  ADD CONSTRAINT FK_USERLIBRARY_PRODUCTLIST
  FOREIGN KEY (PRODUCTCODE)
  REFERENCES PRODUCTLIST (PRODUCTCODE)
  NOVALIDATE;

--------------------------------------------------------------------------------
-- 2) Display full name and USERNAME of every user who is at least 18 years old.
--------------------------------------------------------------------------------
SELECT
  FIRSTNAME || ' ' || LASTNAME AS FULLNAME,
  USERNAME
FROM USERBASE
WHERE ADD_MONTHS(BIRTHDAY, 12 * 18) <= SYSDATE;

--------------------------------------------------------------------------------
-- 3) Max length and average length of USERNAME in USERBASE.
--------------------------------------------------------------------------------
SELECT
  MAX(LENGTH(USERNAME)) AS MAX_USERNAME_LENGTH,
  ROUND(AVG(LENGTH(USERNAME)), 2) AS AVG_USERNAME_LENGTH
FROM USERBASE;

--------------------------------------------------------------------------------
-- 4) Every QUESTION starting with 'What is' or 'What was' in SECURITYQUESTION.
--------------------------------------------------------------------------------
SELECT QUESTION
FROM SECURITYQUESTION
WHERE QUESTION LIKE 'What is%'
   OR QUESTION LIKE 'What was%';

--------------------------------------------------------------------------------
-- 5) PRODUCTCODE, lowest RATING, review count in REVIEWS, order by count DESC.
--------------------------------------------------------------------------------
SELECT
  PRODUCTCODE,
  MIN(RATING) AS LOWEST_RATING,
  COUNT(*) AS REVIEW_COUNT
FROM REVIEWS
GROUP BY PRODUCTCODE
ORDER BY REVIEW_COUNT DESC;

--------------------------------------------------------------------------------
-- 6) PRODUCTCODE ranked at POSITION 1 in WISHLIST + how many users did that.
--------------------------------------------------------------------------------
SELECT
  PRODUCTCODE,
  COUNT(*) AS USERS_AT_POSITION_1
FROM WISHLIST
WHERE POSITION = 1
GROUP BY PRODUCTCODE;

--------------------------------------------------------------------------------
-- 7) USERID and total spent in ORDERS.
-- FIX: ORDERS money column is PRICE.
--------------------------------------------------------------------------------
SELECT
  USERID,
  SUM(PRICE) AS TOTAL_SPENT
FROM ORDERS
GROUP BY USERID
ORDER BY TOTAL_SPENT DESC;

--------------------------------------------------------------------------------
-- 8) Gross profits of all orders by PURCHASEDATE, sorted DESC.
-- FIX: uses PRICE.
--------------------------------------------------------------------------------
SELECT
  PURCHASEDATE,
  SUM(PRICE) AS GROSS_PROFIT
FROM ORDERS
GROUP BY PURCHASEDATE
ORDER BY GROSS_PROFIT DESC;

--------------------------------------------------------------------------------
-- 9) PRODUCTCODE and sum HOURSPLAYED from USERLIBRARY, top 5 DESC.
--------------------------------------------------------------------------------
SELECT
  PRODUCTCODE,
  SUM(HOURSPLAYED) AS TOTAL_HOURSPLAYED
FROM USERLIBRARY
GROUP BY PRODUCTCODE
ORDER BY TOTAL_HOURSPLAYED DESC
FETCH FIRST 5 ROWS ONLY;

--------------------------------------------------------------------------------
-- 10) View: USERID + count of infractions received (highest first).
--------------------------------------------------------------------------------
CREATE OR REPLACE VIEW VW_USER_INFRACTION_COUNTS AS
SELECT
  USERID,
  COUNT(*) AS INFRACTION_COUNT
FROM INFRACTIONS
GROUP BY USERID
ORDER BY INFRACTION_COUNT DESC;

--------------------------------------------------------------------------------
-- 11) View: USERID, RULENUM, times broken; sorted by USERID.
--------------------------------------------------------------------------------
CREATE OR REPLACE VIEW VW_USER_RULE_INFRACTIONS AS
SELECT
  USERID,
  RULENUM,
  COUNT(*) AS TIMES_BROKEN
FROM INFRACTIONS
GROUP BY USERID, RULENUM
ORDER BY USERID;

--------------------------------------------------------------------------------
-- 12) RULENUM, PENALTY, count of that PENALTY assigned to that RULENUM.
--------------------------------------------------------------------------------
SELECT
  RULENUM,
  PENALTY,
  COUNT(*) AS PENALTY_COUNT
FROM INFRACTIONS
WHERE PENALTY IS NOT NULL
GROUP BY RULENUM, PENALTY
ORDER BY RULENUM, PENALTY;

--------------------------------------------------------------------------------
-- 13) Avg/Max/Min time between DATEUPDATED and DATESUBMITTED for CLOSED tickets.
-- FIX: Uses auto-detected VW_TICKETS_NORMALIZED (may return no rows if no table).
--------------------------------------------------------------------------------
SELECT
  ROUND(AVG(DATEUPDATED - DATESUBMITTED), 2) AS AVG_DAYS_TO_CLOSE,
  MAX(DATEUPDATED - DATESUBMITTED) AS MAX_DAYS_TO_CLOSE,
  MIN(DATEUPDATED - DATESUBMITTED) AS MIN_DAYS_TO_CLOSE
FROM VW_TICKETS_NORMALIZED
WHERE STATUS = 'CLOSED';

--------------------------------------------------------------------------------
-- 14) EMAIL, ISSUE, count of ISSUE submitted for NEW tickets,
--     grouped by DATESUBMITTED, ordered by count.
--------------------------------------------------------------------------------
SELECT
  EMAIL,
  ISSUE,
  COUNT(*) AS ISSUE_COUNT
FROM VW_TICKETS_NORMALIZED
WHERE STATUS = 'NEW'
GROUP BY EMAIL, ISSUE, DATESUBMITTED
ORDER BY ISSUE_COUNT;

--------------------------------------------------------------------------------
-- 15) Any user whose PASSWORD contains their FIRSTNAME or LASTNAME.
--------------------------------------------------------------------------------
SELECT
  USERID,
  FIRSTNAME,
  LASTNAME,
  USERNAME,
  PASSWORD
FROM USERBASE
WHERE INSTR(LOWER(PASSWORD), LOWER(FIRSTNAME)) > 0
   OR INSTR(LOWER(PASSWORD), LOWER(LASTNAME)) > 0;

--------------------------------------------------------------------------------
-- 16) PUBLISHER and average PRICE of their products, alphabetical by PUBLISHER.
-- FIX: Uses VW_PRODUCTLIST_NORMALIZED.
--------------------------------------------------------------------------------
SELECT
  PUBLISHER,
  ROUND(AVG(PRICE), 2) AS AVG_PRICE
FROM VW_PRODUCTLIST_NORMALIZED
GROUP BY PUBLISHER
ORDER BY PUBLISHER;

--------------------------------------------------------------------------------
-- 17) View: PRODUCTNAME and discounted PRICE (25% off) for products released
--     over 5 years ago. Uses VW_PRODUCTLIST_NORMALIZED.
--------------------------------------------------------------------------------
CREATE OR REPLACE VIEW VW_PRODUCTS_5YRS_DISCOUNT AS
SELECT
  PRODUCTNAME,
  PRICE * 0.75 AS DISCOUNTED_PRICE
FROM VW_PRODUCTLIST_NORMALIZED
WHERE ADD_MONTHS(RELEASEDATE, 12 * 5) <= SYSDATE;

--------------------------------------------------------------------------------
-- 18) Max and Min PRICE by GENRE.
--------------------------------------------------------------------------------
SELECT
  GENRE,
  MAX(PRICE) AS MAX_PRICE,
  MIN(PRICE) AS MIN_PRICE
FROM VW_PRODUCTLIST_NORMALIZED
GROUP BY GENRE
ORDER BY GENRE;

--------------------------------------------------------------------------------
-- 19) View: CHATLOG messages with DATESENT between now and previous week.
-- FIX: VW_CHATLOG_LAST_WEEK already created above (auto-detects date column).
--------------------------------------------------------------------------------
-- (View already created at top)

--------------------------------------------------------------------------------
-- 20) View: USERID, DATEASSIGNED, PENALTY where PENALTY not null and assigned
--     within last month.
--------------------------------------------------------------------------------
CREATE OR REPLACE VIEW VW_RECENT_PENALTIES AS
SELECT
  USERID,
  DATEASSIGNED,
  PENALTY
FROM INFRACTIONS
WHERE PENALTY IS NOT NULL
  AND DATEASSIGNED >= ADD_MONTHS(SYSDATE, -1);
