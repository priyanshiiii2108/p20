import { useEffect, useState } from 'react'
import EmployeeForm from "./component/EmployeeForm";
import EmployeeList from "./component/EmployeeList";
import EmployeeItem from './component/EmployeeItem';

const API = 'https://dummyjson.com/users'

function App() {
  const [employees, setEmployees] = useState([])
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // READ: Fetch employees from API
  useEffect(() => {
    fetch(API)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch employees')
        return response.json()
      })
      .then((data) => {
        const records = data.users.map((user) => ({
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          department: user.company?.department || 'General',
          salary: user.company?.title ? 30000 : 25000,
        }))

        setEmployees(records)
      })
      .catch(() => setError('Unable to load employees from API.'))
      .finally(() => setLoading(false))
  }, [])

  // CREATE and UPDATE
  const handleSave = async (employee) => {
    try {
      if (editingEmployee) {
        const response = await fetch(
          `${API}/${editingEmployee.id}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employee),
          }
        )

        if (!response.ok) throw new Error('Update failed')

        setEmployees((prev) =>
          prev.map((item) =>
            item.id === editingEmployee.id
              ? { ...item, ...employee }
              : item
          )
        )

        setEditingEmployee(null)
      } else {
        const response = await fetch(`${API}/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(employee),
        })

        if (!response.ok) throw new Error('Create failed')

        const data = await response.json()

        const newEmployee = {
          ...employee,
          id: Math.max(0, ...employees.map((item) => item.id)) + 1,
        }

        setEmployees((prev) => [newEmployee, ...prev])
      }
    } catch {
      alert('API request failed. Please try again.')
    }
  }

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) {
      return
    }

    try {
      const response = await fetch(`${API}/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Delete failed')

      setEmployees((prev) => prev.filter((item) => item.id !== id))

      if (editingEmployee?.id === id) {
        setEditingEmployee(null)
      }
    } catch {
      alert('Unable to delete employee.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-center text-3xl font-bold text-blue-700">
          Employee Management System
        </h1>

        <p className="mb-8 text-center text-gray-600">
          Manage employees using React and Tailwind CSS
        </p>

        {error && (
          <p className="mb-4 rounded-lg bg-red-100 p-3 text-red-700">
            {error}
          </p>
        )}

        <EmployeeForm
          onSave={handleSave}
          editingEmployee={editingEmployee}
          onCancel={() => setEditingEmployee(null)}
        />

        {loading ? (
          <p className="py-8 text-center text-lg text-blue-600">
            Loading employees...
          </p>
        ) : (
          <EmployeeList
            employees={employees}
            onEdit={setEditingEmployee}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  )
}

export default App