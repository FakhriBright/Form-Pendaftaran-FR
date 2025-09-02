import { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    jurusan: "",
    gender: "",
    alamat: "",
    setuju: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Data berhasil dikirim:\n${JSON.stringify(form, null, 2)}`);
  };

  return (
    <div className="app">
      <h1>Form Pendaftaran Mahasiswa</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nama Lengkap:
          <input
            type="text"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Jurusan:
          <select
            name="jurusan"
            value={form.jurusan}
            onChange={handleChange}
            required
          >
            <option value="">-- Pilih Jurusan --</option>
            <option value="Informatika">Informatika</option>
            <option value="Sistem Informasi">Sistem Informasi</option>
            <option value="Teknik Elektro">Teknik Elektro</option>
            <option value="Manajemen">Manajemen</option>
          </select>
        </label>
<fieldset className="gender-group">
  <legend>Jenis Kelamin:</legend>
  <label>
    <input
      type="radio"
      name="gender"
      value="Laki-laki"
      checked={form.gender === "Laki-laki"}
      onChange={handleChange}
      required
    />
    Laki-laki
  </label>
  <label>
    <input
      type="radio"
      name="gender"
      value="Perempuan"
      checked={form.gender === "Perempuan"}
      onChange={handleChange}
      required
    />
    Perempuan
  </label>
</fieldset>

        <label>
          Alamat:
          <textarea
            name="alamat"
            value={form.alamat}
            onChange={handleChange}
            required
          />
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            name="setuju"
            checked={form.setuju}
            onChange={handleChange}
            required
          />
          Saya menyatakan data di atas benar
        </label>

        <button type="submit">Daftar</button>
      </form>
    </div>
  );
}

export default App;
