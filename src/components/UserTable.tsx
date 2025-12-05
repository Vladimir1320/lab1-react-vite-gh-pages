import { useState } from 'react'
import { downloadUsers } from './downloadUsers'

type User = {
  id: number
  name: string
  email: string
  phone: string
  website: string
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const data: User[] = await downloadUsers()
      setUsers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="user-table-container">
      <button
        onClick={fetchUsers}
        disabled={loading}
      >
        {loading ? 'Загрузка...' : 'Загрузить пользователей'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {users.length > 0 && (
        <table
          border={1}
          style={{ marginTop: '20px', borderCollapse: 'collapse', width: '100%' }}
        >
          <thead>
            <tr>
              <th>Имя</th>
              <th>Email</th>
              <th>Телефон</th>
              <th>Сайт</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">
                    {user.website}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}