-- Jade Powell
-- 5.2 Project: Displaying Assorted Data
-- Script name: DisplayAssortedData.sql

/* =========================================================
   Q1. Display the USERID of any users who have not made an order.
   (MINUS)
========================================================= */
SELECT u.USERID
FROM USERBASE u
MINUS
SELECT o.USERID
FROM ORDERS o;


/* =========================================================
   Q2. Display the PRODUCTCODE of any products that have no reviews.
   (MINUS)
========================================================= */
SELECT p.PRODUCTCODE
FROM PRODUCTLIST p
MINUS
SELECT r.PRODUCTCODE
FROM REVIEWS r;


/* =========================================================
   Q3. Display all data in USERBASE + column Adult/Minor.
========================================================= */
SELECT
  u.*,
  CASE
    WHEN ADD_MONTHS(u.BIRTHDAY, 12*18) <= SYSDATE THEN 'Adult'
    ELSE 'Minor'
  END AS AGE_GROUP
FROM USERBASE u
ORDER BY u.USERID;


/* =========================================================
   Q4. Display all data in PRODUCTLIST + column On Sale/Base Price.
========================================================= */
SELECT
  p.*,
  CASE
    WHEN p.PRICE <= 20 THEN 'On Sale'
    ELSE 'Base Price'
  END AS PRICE_LABEL
FROM PRODUCTLIST p
ORDER BY p.PRODUCTCODE;


/* =========================================================
   Q5. Display the USERID of any user who has played PRODUCTCODE 'GAME6'
       and has a user profile image.
   NOTE: If your USERPROFILE image column name is different, replace
         up.PROFILEIMAGE below with the correct column.
========================================================= */
SELECT DISTINCT ul.USERID
FROM USERLIBRARY ul
JOIN USERPROFILE up
  ON up.USERID = ul.USERID
WHERE ul.PRODUCTCODE = 'GAME6'
  AND up.PROFILEIMAGE IS NOT NULL
ORDER BY ul.USERID;


/* =========================================================
   Q6. Display any PRODUCTCODE from the INTERSECT of WISHLIST and REVIEWS,
       where wishlist POSITION is 1 or 2, and review RATING >= 3.
   NOTE: If WISHLIST uses a different column name than POSITION, replace it.
   (INTERSECT)
========================================================= */
SELECT w.PRODUCTCODE
FROM WISHLIST w
WHERE w.POSITION IN (1, 2)
INTERSECT
SELECT r.PRODUCTCODE
FROM REVIEWS r
WHERE r.RATING >= 3;


/* =========================================================
   Q7. Display USERNAME and BIRTHDAY for users who share the same BIRTHDAY.
   (SELF JOIN)
========================================================= */
SELECT DISTINCT
  u1.USERNAME,
  u1.BIRTHDAY
FROM USERBASE u1
JOIN USERBASE u2
  ON u1.BIRTHDAY = u2.BIRTHDAY
 AND u1.USERID <> u2.USERID
ORDER BY u1.BIRTHDAY, u1.USERNAME;


/* =========================================================
   Q8. Display the Cartesian Product of USERLIBRARY cross joined with WISHLIST.
   (CROSS JOIN)
========================================================= */
SELECT
  ul.USERID        AS LIB_USERID,
  ul.PRODUCTCODE   AS LIB_PRODUCTCODE,
  w.USERID         AS WISH_USERID,
  w.PRODUCTCODE    AS WISH_PRODUCTCODE
FROM USERLIBRARY ul
CROSS JOIN WISHLIST w
ORDER BY ul.USERID, w.USERID;


/* =========================================================
   Q9. UNION ALL on USERBASE and PRODUCTLIST to show all users and products.
   (UNION ALL)  -- columns must match in count + compatible types
========================================================= */
SELECT
  TO_CHAR(u.USERID)        AS ID_VALUE,
  'USER'                   AS RECORD_TYPE,
  u.USERNAME               AS NAME_VALUE,
  u.EMAIL                  AS EXTRA_VALUE
FROM USERBASE u
UNION ALL
SELECT
  p.PRODUCTCODE            AS ID_VALUE,
  'PRODUCT'                AS RECORD_TYPE,
  p.PRODUCTNAME            AS NAME_VALUE,
  p.GENRE                  AS EXTRA_VALUE
FROM PRODUCTLIST p
ORDER BY RECORD_TYPE, ID_VALUE;


/* =========================================================
   Q10. UNION ALL on CHATLOG and USERPROFILE to show user activity.
   Kept intentionally simple: just USERIDs from each source.
   (UNION ALL)
========================================================= */
SELECT
  TO_CHAR(c.USERID) AS USERID_VALUE,
  'CHATLOG'         AS SOURCE
FROM CHATLOG c
UNION ALL
SELECT
  TO_CHAR(up.USERID) AS USERID_VALUE,
  'USERPROFILE'      AS SOURCE
FROM USERPROFILE up
ORDER BY SOURCE, USERID_VALUE;


/* =========================================================
   Q11. Display USERNAME of users who have NOT received an INFRACTION.
   (MINUS)
========================================================= */
SELECT u.USERNAME
FROM USERBASE u
MINUS
SELECT u.USERNAME
FROM USERBASE u
JOIN INFRACTIONS i
  ON i.USERID = u.USERID;


/* =========================================================
   Q12. Display TITLE + DESCRIPTION of COMMUNITYRULES that have not been broken.
========================================================= */
SELECT
  c.TITLE,
  c.DESCRIPTION
FROM COMMUNITYRULES c
WHERE c.RULENUM NOT IN (
  SELECT DISTINCT i.RULENUM
  FROM INFRACTIONS i
)
ORDER BY c.RULENUM;


/* =========================================================
   Q13. Display USERNAME and EMAIL of users who have received a PENALTY.
========================================================= */
SELECT DISTINCT
  u.USERNAME,
  u.EMAIL
FROM USERBASE u
JOIN INFRACTIONS i
  ON i.USERID = u.USERID
WHERE i.PENALTY IS NOT NULL
ORDER BY u.USERNAME;


/* =========================================================
   Q14. Display dates where an INFRACTION was assigned AND a USERSUPPORT ticket
       was submitted on the same day.
   (INTERSECT)
========================================================= */
SELECT TRUNC(i.DATEASSIGNED) AS MATCH_DATE
FROM INFRACTIONS i
INTERSECT
SELECT TRUNC(t.DATESUBMITTED) AS MATCH_DATE
FROM USERSUPPORT t
ORDER BY MATCH_DATE;


/* =========================================================
   Q15. Display every COMMUNITYRULES TITLE and PENALTY.
   (Join rules to infractions to show penalties assigned for those rules)
========================================================= */
SELECT
  c.TITLE,
  i.PENALTY
FROM COMMUNITYRULES c
JOIN INFRACTIONS i
  ON i.RULENUM = c.RULENUM
ORDER BY c.RULENUM, i.DATEASSIGNED;


/* =========================================================
   Q16. Display all COMMUNITYRULES + column Bannable/Appealable.
   NOTE: Your column is SEVERITYPOINT (singular).
========================================================= */
SELECT
  c.*,
  CASE
    WHEN c.SEVERITYPOINT >= 10 THEN 'Bannable'
    ELSE 'Appealable'
  END AS RULE_ACTION
FROM COMMUNITYRULES c
ORDER BY c.RULENUM;


/* =========================================================
   Q17. Display all USERSUPPORT + column High Priority for tickets that are
       NOT closed and have NOT been updated in the past week.
========================================================= */
SELECT
  t.*,
  CASE
    WHEN UPPER(t.STATUS) <> 'CLOSED'
     AND t.DATEUPDATED < (SYSDATE - 7)
    THEN 'High Priority'
    ELSE NULL
  END AS PRIORITY_FLAG
FROM USERSUPPORT t
ORDER BY t.TICKETID;


/* =========================================================
   Q18. Cartesian Product of USERSUPPORT cross joined with INFRACTIONS.
   (CROSS JOIN)
========================================================= */
SELECT
  t.TICKETID,
  t.EMAIL          AS TICKET_EMAIL,
  i.USERID         AS INFRACTION_USERID,
  i.RULENUM        AS INFRACTION_RULENUM,
  i.PENALTY        AS INFRACTION_PENALTY
FROM USERSUPPORT t
CROSS JOIN INFRACTIONS i
ORDER BY t.TICKETID, i.USERID;


/* =========================================================
   Q19. Display TICKETID and DATEUPDATED for support tickets that are CLOSED
       and DATEUPDATED was on the same day as DATESUBMITTED.
========================================================= */
SELECT
  t.TICKETID,
  t.DATEUPDATED
FROM USERSUPPORT t
WHERE UPPER(t.STATUS) = 'CLOSED'
  AND TRUNC(t.DATEUPDATED) = TRUNC(t.DATESUBMITTED)
ORDER BY t.TICKETID;


/* =========================================================
   Q20. UNION ALL on USERBASE and INFRACTIONS to generate user activity.
   (UNION ALL)
========================================================= */
SELECT
  u.USERID                     AS USERID,
  u.USERNAME                   AS USERNAME,
  'USER RECORD'                AS ACTIVITY_TYPE,
  CAST(NULL AS DATE)           AS ACTIVITY_DATE,
  CAST(NULL AS VARCHAR2(100))  AS DETAILS
FROM USERBASE u
UNION ALL
SELECT
  i.USERID                     AS USERID,
  u.USERNAME                   AS USERNAME,
  'INFRACTION'                 AS ACTIVITY_TYPE,
  i.DATEASSIGNED               AS ACTIVITY_DATE,
  i.PENALTY                    AS DETAILS
FROM INFRACTIONS i
JOIN USERBASE u
  ON u.USERID = i.USERID
ORDER BY USERID, ACTIVITY_DATE;
