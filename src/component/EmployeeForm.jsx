import { useEffect, useState } from 'react'

function EmployeeForm({ onSave, editingEmployee, onCancel }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    department: '',
    salary: '',
  })

  useEffect(() => {
    if (editingEmployee) {
      setForm({
        name: editingEmployee.name,
        email: editingEmployee.email,
        department: editingEmployee.department,
        salary: editingEmployee.salary,
      })
    } else {
      setForm({
        name: '',
        email: '',
        department: '',
        salary: '',
      })
    }
  }, [editingEmployee])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.name || !form.email || !form.department || !form.salary) {
      alert('Please fill all fields')
      return
    }

    onSave({
      ...form,
      salary: Number(form.salary),
    })

    setForm({
      name: '',
      email: '',
      department: '',
      salary: '',
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-xl bg-white p-6 shadow-md"
    >
      <h2 className="mb-4 text-xl font-bold text-gray-800">
        {editingEmployee ? 'Update Employee' : 'Add Employee'}
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          name="name"
          placeholder="Employee Name"
          value={form.name}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <input
          name="salary"
          type="number"
          min="0"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />
      </div>

      <div className="mt-5 flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          {editingEmployee ? 'Update' : 'Add Employee'}
        </button>

        {editingEmployee && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg bg-gray-500 px-5 py-2 text-white"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default EmployeeForm