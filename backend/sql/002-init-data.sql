USE pet_boarding;

INSERT INTO users (open_id, nickname, phone)
VALUES ('demo-open-id', 'DemoUser', '13800000000')
ON DUPLICATE KEY UPDATE nickname = VALUES(nickname);

INSERT INTO products (name, price, stock)
VALUES ('寄养试用套餐', 99.00, 100);
