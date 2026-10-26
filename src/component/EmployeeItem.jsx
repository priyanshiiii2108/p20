function EmployeeItem({ employee, onEdit, onDelete }) {
  return (
    <tr className="border-b hover:bg-blue-50">
      <td className="p-3">{employee.name}</td>
      <td className="p-3">{employee.email}</td>
      <td className="p-3">{employee.department}</td>
      <td className="p-3">₹{employee.salary}</td>

      <td className="space-x-2 p-3">
        <button
          onClick={() => onEdit(employee)}
          className="rounded bg-yellow-500 px-3 py-1 text-white"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(employee.id)}
          className="rounded bg-red-600 px-3 py-1 text-white"
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

export default EmployeeItem