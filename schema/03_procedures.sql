DELIMITER $$

CREATE PROCEDURE add_random_allergen_to_meal(IN mealId INT)
BEGIN
    DECLARE allergen_id INT;

    -- losowa liczba: 0 lub 1
    IF FLOOR(RAND() * 2) = 1 THEN
        SELECT id INTO allergen_id
        FROM allergens
        ORDER BY RAND()
        LIMIT 1;

        INSERT INTO meals_allergens (mealsId, allergensId)
        VALUES (mealId, allergen_id);
    END IF;
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER meals_after_insert
AFTER INSERT ON meals
FOR EACH ROW
BEGIN
    CALL add_random_allergen_to_meal(NEW.id);
END$$

DELIMITER ;

-- procedura z kursorem
DELIMITER $$

CREATE PROCEDURE report_user_meal_counts_by_company(IN input_company_id INT)
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE uid INT;
    DECLARE meal_count INT;

    -- Cursor dla użytkowników przypisanych do firmy
    DECLARE user_cursor CURSOR FOR
        SELECT usersId
        FROM companies_users
        WHERE companiesId = input_company_id;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- Tymczasowa tabela na wyniki
    DROP TEMPORARY TABLE IF EXISTS temp_user_meal_counts;
    CREATE TEMPORARY TABLE temp_user_meal_counts (
        user_id INT,
        meals_ordered INT
    );

    OPEN user_cursor;

    read_loop: LOOP
        FETCH user_cursor INTO uid;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Zlicz zamówione posiłki przez użytkownika w firmie
        SELECT COUNT(oc.id) INTO meal_count
        FROM orders o
        JOIN orders_contents oc ON o.id = oc.orderId
        WHERE o.userId = uid AND o.companyId = input_company_id;

        INSERT INTO temp_user_meal_counts (user_id, meals_ordered)
        VALUES (uid, meal_count);
    END LOOP;

    CLOSE user_cursor;

    -- Wyświetlenie raportu
    SELECT * FROM temp_user_meal_counts;
END$$

DELIMITER ;

