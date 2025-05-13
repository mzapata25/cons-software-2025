CREATE PROCEDURE tc2005b_db.suma_cant_import_97()
begin
	select SUM(e.cantidad) as cant_total, SUM(m.precio) as precio_total from entregan e inner join materiales m on e.clave = m.clave where year(e.fecha) = 1997;
END;

CREATE PROCEDURE tc2005b_db.suma_cant_import_anio(in anio INT)
begin
	select SUM(e.cantidad) as cant_total, SUM(m.precio) as precio_total from entregan e inner join materiales m on e.clave = m.clave where year(e.fecha) = anio;
END;

CREATE PROCEDURE tc2005b_db.precio_cantidad()
begin
	select e.clave, e.cantidad, m.precio from entregan e inner join materiales m on e.clave = m.clave where e.cantidad < 500 and m.precio < 1000;
END;