DELETE FROM "CompanyType";
DELETE FROM "Company";
DELETE FROM "MeterType";
DELETE FROM "Meter";
DELETE FROM "MeterReading";

INSERT INTO "CompanyType" ("id", "name") VALUES 
(1, 'Gas'),
(2, 'Electricidad'),
(3, 'Agua');

INSERT INTO "Company" ("id", "name", "idCompanyType") VALUES
(1, 'Gasco',1),
(2, 'Cossbo', 3),
(3, 'Enel', 2);

INSERT INTO "MeterType" ("id", "name") VALUES 
(1, 'Gas'),
(2, 'Electricidad'),
(3, 'Agua');