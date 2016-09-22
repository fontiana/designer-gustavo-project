DELIMITER // 
CREATE PROCEDURE spUpdateProject(
    IN WORK_NAME VARCHAR(200),
    IN WORK_DESCRIPTION VARCHAR(5000),
    IN WORK_CATEGORY INT(11),
    IN COVER_IMAGE VARCHAR(500),
    IN WORK_ID INT(11)
)
BEGIN
    UPDATE
		WORK 
    SET 
		WORK_NAME = WORK_NAME,
		WORK_DESCRIPTION = WORK_DESCRIPTION,
		CATEGORY_ID = WORK_CATEGORY
    WORK_COVER_IMAGE = COVER_IMAGE
    WHERE
		WORK.WORK_ID = WORK_ID;
END //
DELIMITER ;