import { useState, useEffect } from "react";
import ResultChart from "./components/ResultChart";
import { FiUsers, FiCheckCircle, FiXCircle, FiTrendingUp } from "react-icons/fi";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [marks, setMarks] = useState("");

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(data);
  }, []);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const login = () => {
    if (username === "admin" && password === "12345") {
      setLoggedIn(true);
    } else {
      alert("Invalid Credentials");
    }
  };

  const getGrade = (m) => {
    m = Number(m);

    if (m >= 80) return "A";
    if (m >= 70) return "B";
    if (m >= 60) return "C";
    if (m >= 50) return "D";

    return "F";
  };

  const addStudent = () => {
    if (!name || !rollNo || !marks) {
      alert("Fill all fields");
      return;
    }

    const student = {
      id: Date.now(),
      name,
      rollNo,
      marks,
      grade: getGrade(marks),
    };

    setStudents([...students, student]);

    setName("");
    setRollNo("");
    setMarks("");
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const editStudent = (student) => {
    setEditId(student.id);

    setName(student.name);
    setRollNo(student.rollNo);
    setMarks(student.marks);
  };

  const updateStudent = () => {
    setStudents(
      students.map((s) =>
        s.id === editId
          ? {
            ...s,
            name,
            rollNo,
            marks,
            grade: getGrade(marks),
          }
          : s
      )
    );

    setEditId(null);
    setName("");
    setRollNo("");
    setMarks("");
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(search.toLowerCase())
  );

  const passed = students.filter((s) => Number(s.marks) >= 50).length;

  const failed = students.filter((s) => Number(s.marks) < 50).length;

  const average =
    students.length > 0
      ? (
        students.reduce((acc, curr) => acc + Number(curr.marks), 0) /
        students.length
      ).toFixed(1)
      : 0;

  if (!loggedIn) {
    return (
      <div 
        className="min-h-screen flex flex-col"
        style={{
          backgroundImage: "url('/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        <nav 
          className="navbar navbar-dark px-4 py-3"
          style={{
            backgroundColor: "rgba(33, 37, 41, 0.8)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 5px 20px rgba(0,0,0,0.2)"
          }}
        >
          <h3 className="text-white mb-0">
            📚 Student Management Result
          </h3>
        </nav>

        <div className="flex-grow flex items-center justify-center">
          <div className="p-5 rounded-4 shadow-lg w-100" style={{ maxWidth: "400px", backgroundColor: "rgba(255, 255, 255, 0.7)" }}>
          <h2 className="text-center mb-4 text-danger fw-bold">
            Welcome Back! 
          </h2>

          <input
            className="form-control mb-3"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="btn btn-success w-100"
            onClick={login}
          >
            Login
          </button>

          <p className="mt-3 text-center text-muted">
            admin / 12345
          </p>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <nav 
        className="navbar navbar-dark px-4 py-3"
        style={{
          backgroundColor: "rgba(33, 37, 41, 0.85)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 5px 20px rgba(0,0,0,0.2)"
        }}
      >
        <h3 className="text-white">
          Student Result Dashboard
        </h3>

        <button
          className="btn btn-danger"
          onClick={() => setLoggedIn(false)}
        >
          Logout
        </button>
      </nav>

      <div className="container py-4">

        <div className="row g-3 mb-4">

          <div className="col-md-3">
            <div className="card shadow border-0" style={{ borderLeft: "4px solid #0d6efd" }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">Total Students</h6>
                    <h2 className="text-primary">{students.length}</h2>
                  </div>
                  <FiUsers size={40} className="text-primary opacity-25" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0" style={{ borderLeft: "4px solid #198754" }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">Passed</h6>
                    <h2 className="text-success">{passed}</h2>
                  </div>
                  <FiCheckCircle size={40} className="text-success opacity-25" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0" style={{ borderLeft: "4px solid #dc3545" }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">Failed</h6>
                    <h2 className="text-danger">{failed}</h2>
                  </div>
                  <FiXCircle size={40} className="text-danger opacity-25" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0" style={{ borderLeft: "4px solid #fd7e14" }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">Average Marks</h6>
                    <h2 className="text-warning">{average}%</h2>
                  </div>
                  <FiTrendingUp size={40} className="text-warning opacity-25" />
                </div>
              </div>
            </div>
          </div>

        </div>

        <ResultChart students={students} />

        <div className="card shadow border-0 mb-4" style={{ marginTop: "2rem" }}>
          <div className="card-body">

            <div className="row g-2">

              <div className="col-md-3">
                <input
                  className="form-control"
                  placeholder="Student Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.85)"}}
                />
              </div>

              <div className="col-md-3">
                <input
                  className="form-control"
                  placeholder="Roll No"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.85)" }}
                />
              </div>

              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Marks"
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.85)" }}
                />
              </div>

              <div className="col-md-3">
                {editId ? (
                  <button
                    className="btn btn-warning w-100"
                    onClick={updateStudent}
                  >
                    Update Student
                  </button>
                ) : (
                  <button
                    className="btn btn-success w-100"
                    onClick={addStudent}
                  >
                    Add Student
                  </button>
                )}
              </div>

            </div>

          </div>
        </div>

        <input
          className="form-control mb-3"
          placeholder="Search Student..."
          onChange={(e) => setSearch(e.target.value)}
          style={{ backgroundColor: "rgba(255, 255, 255, 0.85)" }}
        />

        <div className="card shadow border-0" style={{ backgroundColor: "rgba(255, 255, 255, 0.85)" }}>
          <div className="card-body">

            <table className="table table-hover" style={{ backgroundColor: "transparent" }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Roll No</th>
                  <th>Marks</th>
                  <th>Grade</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.rollNo}</td>
                    <td>{student.marks}</td>
                    <td>
                      <span
                        className={
                          student.grade === "A"
                            ? "grade-a"
                            : student.grade === "B"
                              ? "grade-b"
                              : student.grade === "C"
                                ? "grade-c"
                                : "grade-f"
                        }
                      >
                        {student.grade}
                      </span>
                    </td>

                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => editStudent(student)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteStudent(student.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        </div>

      </div>
    </div>
  );
}

export default App;