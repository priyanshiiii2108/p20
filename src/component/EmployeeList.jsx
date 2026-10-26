import EmployeeItem from './EmployeeItem'

function EmployeeList({ employees, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow-md">
      <h2 className="p-5 text-xl font-bold text-gray-800">
        Employee List
      </h2>

      {employees.length === 0 ? (
        <p className="p-5 text-center text-gray-500">
          No employees found. Add an employee to get started.
        </p>
      ) : (
        <table className="w-full text-left text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Department</th>
              <th className="p-3">Salary</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <EmployeeItem
                key={employee.id}
                employee={employee}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default EmployeeList