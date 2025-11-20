import bcrypt from "bcrypt";

export async function seed(knex) {
  // Eliminar usuarios previos

  const hashedAdmin = await bcrypt.hash("admin123", 10);
  const hashedStudent = await bcrypt.hash("student123", 10);

  const adminExist = await knex("users")
    .where({ email: "admin@example.com" })
    .first();
  const student1Exist = await knex("users")
    .where({ email: "student@example.com" })
    .first();
  const student2Exist = await knex("users")
    .where({ email: "mauricio.santos@example.com" })
    .first();

  if (!adminExist) {
    await knex("users").insert([
      {
        identification_number: "100000001",
        name: "Admin",
        second_name: null,
        last_name: "",
        email: "admin@example.com",
        password: hashedAdmin,
        date_birth: "1990-01-01",
        school_name: "EduTest",
        graduation_year: 2010,
        city: "Ibagué",
        phone_number: "3000000000",
        parent_name: null,
        parent_email: null,
        parent_phone: null,
        role: "admin",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  }

  if (!student1Exist) {
    await knex("users").insert([
      {
        identification_number: "123456789",
        name: "Student",
        second_name: "",
        last_name: "Leyva",
        email: "student@example.com",
        password: hashedStudent,
        date_birth: "2005-06-15",
        school_name: "Liceo Nacional",
        graduation_year: 2017,
        city: "Ibagué",
        phone_number: "311112222333",
        parent_name: "Padre",
        parent_email: "padre@example.com",
        parent_phone: "311112222333",
        role: "student",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  }

  if (!student2Exist) {
    await knex("users").insert([
      {
        identification_number: "200000002",
        name: "Mauricio",
        second_name: "",
        last_name: "Santos",
        email: "mauricio.santos@example.com",
        password: hashedStudent,
        date_birth: "2005-06-15",
        school_name: "Comfenalco",
        graduation_year: 2015,
        city: "Ibagué",
        phone_number: "311112222333",
        parent_name: "Maria Rebolledo",
        parent_email: "maria@example.com",
        parent_phone: "311112222333",
        role: "student",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  }
}
