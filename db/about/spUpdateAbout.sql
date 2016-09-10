DELIMITER // 
CREATE PROCEDURE spUpdateAbout(
    IN ABOUT_TITLE VARCHAR(200),
    IN ABOUT_DESCRIPTION VARCHAR(5000),
    IN ABOUT_IMAGE VARCHAR(250),
    IN ABOUT_ID INT(11)
)
BEGIN
    UPDATE
		ABOUT 
    SET 
		ABOUT_TITLE = ABOUT_TITLE,
		ABOUT_DESCRIPTION = ABOUT_DESCRIPTION,
        ABOUT_IMAGE = ABOUT_IMAGE
    WHERE
		ABOUT.ABOUT_ID = ABOUT_ID;
END //
DELIMITER ;