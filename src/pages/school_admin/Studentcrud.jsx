import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    profile: "",
    class_name: "",
    section: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Load Students
  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("school-admin/students/");
      setStudents(res.data);
    } catch (err) {
      console.error("Error loading students:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // 🔹 Create Student
  const create = async () => {
    try {
      await api.post("school-admin/students/", form);
      setForm({ profile: "", class_name: "", section: "" });
      load();
    } catch (err) {
      console.error("Create error:", err);
    }
  };

  // 🔹 Update Student
  const update = async (id) => {
    try {
      await api.put(`school-admin/students/${id}/`, form);
      setEditId(null);
      setForm({ profile: "", class_name: "", section: "" });
      load();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // 🔹 Delete Student
  const remove = async (id) => {
    try {
      await api.delete(`school-admin/students/${id}/`);
      load();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Students</h2>

      {loading && <p>Loading...</p>}

      {/* Add Student Form */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Profile ID"
          value={form.profile}
          onChange={(e) =>
            setForm({ ...form, profile: e.target.value })
          }
        />

        <input
          placeholder="Class"
          value={form.class_name}
          onChange={(e) =>
            setForm({ ...form, class_name: e.target.value })
          }
        />

        <input
          placeholder="Section"
          value={form.section}
          onChange={(e) =>
            setForm({ ...form, section: e.target.value })
          }
        />

        <button onClick={create}>Add Student</button>
      </div>

      {/* Students List */}
      {students.map((s) => (
        <div key={s.id} style={{ marginBottom: "10px" }}>
          <strong>{s.profile_name}</strong> - {s.class_name} ({s.section})

          <button
            style={{ marginLeft: "10px" }}
            onClick={() => {
              setEditId(s.id);
              setForm({
                profile: s.profile,
                class_name: s.class_name,
                section: s.section,
              });
            }}
          >
            Edit
          </button>

          <button
            style={{ marginLeft: "5px" }}
            onClick={() => remove(s.id)}
          >
            Delete
          </button>

          {editId === s.id && (
            <div style={{ marginTop: "5px" }}>
              <input
                placeholder="Class"
                value={form.class_name}
                onChange={(e) =>
                  setForm({ ...form, class_name: e.target.value })
                }
              />

              <input
                placeholder="Section"
                value={form.section}
                onChange={(e) =>
                  setForm({ ...form, section: e.target.value })
                }
              />

              <button onClick={() => update(s.id)}>Save</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
