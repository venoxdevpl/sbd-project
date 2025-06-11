DELIMITER $$

CREATE FUNCTION get_user_meal_count(user_id INT)
RETURNS INT
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE total_meals INT;

    SELECT COUNT(oc.id)
    INTO total_meals
    FROM orders o
    JOIN orders_contents oc ON o.id = oc.orderId
    WHERE o.userId = user_id;

    RETURN total_meals;
END$$

DELIMITER ;