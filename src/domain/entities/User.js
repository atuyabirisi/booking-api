class User {
  constructor({ id, name, email, phone, password, role = "USER" }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.role = role;
  }
}

export default User;
