import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userCreateSchema, userEditSchema, type UserCreateFormData, type UserEditFormData } from '@/lib/api/schemas'
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser, useChangeUserRole } from '@/lib/api/hooks'
import { useAuth } from '@/lib/auth/store'
import { FormInput } from '@/components/ui/FormInput'
import { FormSelect } from '@/components/ui/FormSelect'
import { FormTextarea } from '@/components/ui/FormTextarea'
import { Search, Plus, Edit2, Trash2, Shield, AlertCircle, Loader, X } from 'lucide-react'

type ModalMode = null | 'create' | 'edit' | 'delete' | 'change-role'

export default function UserManagementPage() {
  const navigate = useNavigate()
  const { user: currentUser } = useAuth()
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<'' | 'super_admin' | 'admin' | 'operator'>('')
  const [modalMode, setModalMode] = useState<ModalMode>(null)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [apiError, setApiError] = useState('')

  // Queries and mutations
  const { data: usersData, isLoading } = useUsers({ search, role: roleFilter || undefined })
  const createMutation = useCreateUser()
  const updateMutation = useUpdateUser()
  const deleteMutation = useDeleteUser()
  const changeRoleMutation = useChangeUserRole()

  // Form hooks
  const createForm = useForm<UserCreateFormData>({
    resolver: zodResolver(userCreateSchema),
  })

  const editForm = useForm<UserEditFormData>({
    resolver: zodResolver(userEditSchema),
  })

  // Filter and search users
  const users = usersData?.data || []
  const filteredUsers = useMemo(() => {
    let result = users
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(u =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
      )
    }
    if (roleFilter) {
      result = result.filter(u => u.role === roleFilter)
    }
    return result
  }, [users, search, roleFilter])

  const handleCreateSubmit = async (data: UserCreateFormData) => {
    setApiError('')
    try {
      await createMutation.mutateAsync(data)
      setModalMode(null)
      createForm.reset()
    } catch (error: any) {
      setApiError(error?.response?.data?.message || 'Failed to create user')
    }
  }

  const handleEditSubmit = async (data: UserEditFormData) => {
    setApiError('')
    try {
      await updateMutation.mutateAsync({
        id: selectedUser.id,
        ...data,
      })
      setModalMode(null)
      editForm.reset()
      setSelectedUser(null)
    } catch (error: any) {
      setApiError(error?.response?.data?.message || 'Failed to update user')
    }
  }

  const handleDelete = async () => {
    setApiError('')
    try {
      await deleteMutation.mutateAsync(selectedUser.id)
      setModalMode(null)
      setSelectedUser(null)
    } catch (error: any) {
      setApiError(error?.response?.data?.message || 'Failed to delete user')
    }
  }

  const handleChangeRole = async (newRole: string) => {
    setApiError('')
    try {
      await changeRoleMutation.mutateAsync({
        id: selectedUser.id,
        role: newRole,
      })
      setModalMode(null)
      setSelectedUser(null)
    } catch (error: any) {
      setApiError(error?.response?.data?.message || 'Failed to change role')
    }
  }

  const openEditModal = (user: any) => {
    setSelectedUser(user)
    editForm.reset({
      name: user.name,
      phone: user.phone,
      bio: user.bio || '',
      password: '',
    })
    setModalMode('edit')
  }

  const openDeleteModal = (user: any) => {
    setSelectedUser(user)
    setModalMode('delete')
  }

  const openChangeRoleModal = (user: any) => {
    setSelectedUser(user)
    setModalMode('change-role')
  }

  const closeModal = () => {
    setModalMode(null)
    setSelectedUser(null)
    setApiError('')
    createForm.reset()
    editForm.reset()
  }

  const canManageUsers = (currentUser?.roles || []).includes('super_admin')

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">User Management</h1>
          {canManageUsers && (
            <button
              onClick={() => navigate('/signup-admin')}
              className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Admin
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-slate-900 rounded-lg p-4 mb-6 border border-slate-800 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as any)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="">All Roles</option>
              <option value="super_admin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="operator">Operator</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 animate-spin text-cyan-500" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="bg-slate-900 rounded-lg p-12 text-center border border-slate-800">
            <p className="text-slate-400">No users found</p>
          </div>
        ) : (
          <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-800 border-b border-slate-700">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Last Login</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                    <td className="px-6 py-4 text-white font-medium">{user.name}</td>
                    <td className="px-6 py-4 text-slate-300 text-sm">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300">
                        {user.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-sm">
                      {user.last_login_at ? new Date(user.last_login_at).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(user)}
                          className="p-2 hover:bg-slate-700 rounded transition-colors text-slate-400 hover:text-cyan-400"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {canManageUsers && (
                          <>
                            <button
                              onClick={() => openChangeRoleModal(user)}
                              className="p-2 hover:bg-slate-700 rounded transition-colors text-slate-400 hover:text-cyan-400"
                              title="Change Role"
                            >
                              <Shield className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => openDeleteModal(user)}
                              className="p-2 hover:bg-slate-700 rounded transition-colors text-slate-400 hover:text-red-400"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modals */}
        {modalMode === 'create' && (
          <Modal
            title="Create New User"
            onClose={closeModal}
            onSubmit={createForm.handleSubmit(handleCreateSubmit)}
            isSubmitting={createMutation.isPending}
            error={apiError}
          >
            <FormInput
              label="Name"
              placeholder="John Doe"
              {...createForm.register('name')}
              error={createForm.formState.errors.name}
            />
            <FormInput
              label="Email"
              type="email"
              placeholder="john@example.com"
              {...createForm.register('email')}
              error={createForm.formState.errors.email}
            />
            <FormInput
              label="Phone"
              type="tel"
              placeholder="+234 800 000 0000"
              {...createForm.register('phone')}
              error={createForm.formState.errors.phone}
            />
            <FormSelect
              label="Role"
              {...createForm.register('role')}
              options={[
                { value: 'super_admin', label: 'Super Admin' },
                { value: 'admin', label: 'Admin' },
                { value: 'operator', label: 'Operator' },
              ]}
              error={createForm.formState.errors.role}
            />
            <FormInput
              label="Password"
              type="password"
              placeholder="••••••••"
              {...createForm.register('password')}
              error={createForm.formState.errors.password}
              hint="Minimum 8 characters"
            />
          </Modal>
        )}

        {modalMode === 'edit' && (
          <Modal
            title="Edit User"
            onClose={closeModal}
            onSubmit={editForm.handleSubmit(handleEditSubmit)}
            isSubmitting={updateMutation.isPending}
            error={apiError}
          >
            <FormInput
              label="Name"
              placeholder="John Doe"
              {...editForm.register('name')}
              error={editForm.formState.errors.name}
            />
            <FormInput
              label="Phone"
              type="tel"
              placeholder="+234 800 000 0000"
              {...editForm.register('phone')}
              error={editForm.formState.errors.phone}
            />
            <FormTextarea
              label="Bio (optional)"
              placeholder="Brief bio..."
              {...editForm.register('bio')}
              error={editForm.formState.errors.bio}
              maxLength={500}
            />
            <FormInput
              label="New Password (optional)"
              type="password"
              placeholder="Leave blank to keep current password"
              {...editForm.register('password')}
              error={editForm.formState.errors.password}
              hint="Minimum 8 characters if provided"
            />
          </Modal>
        )}

        {modalMode === 'delete' && selectedUser && (
          <ConfirmModal
            title="Delete User"
            message={`Are you sure you want to delete ${selectedUser.name}? This action cannot be undone.`}
            onClose={closeModal}
            onConfirm={handleDelete}
            isLoading={deleteMutation.isPending}
            isDangerous
          />
        )}

        {modalMode === 'change-role' && selectedUser && (
          <ChangeRoleModal
            user={selectedUser}
            onClose={closeModal}
            onConfirm={handleChangeRole}
            isLoading={changeRoleMutation.isPending}
          />
        )}
      </div>
    </div>
  )
}

function Modal({
  title,
  onClose,
  onSubmit,
  isSubmitting,
  error,
  children,
}: {
  title: string
  onClose: () => void
  onSubmit: () => void
  isSubmitting: boolean
  error: string
  children: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-lg border border-slate-800 max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-800 rounded-lg flex gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); onSubmit() }} className="space-y-4 mb-6">
          {children}
        </form>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-700 text-slate-900 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

function ConfirmModal({
  title,
  message,
  onClose,
  onConfirm,
  isLoading,
  isDangerous = false,
}: {
  title: string
  message: string
  onClose: () => void
  onConfirm: () => void
  isLoading: boolean
  isDangerous?: boolean
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-lg border border-slate-800 max-w-md w-full p-6">
        <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
        <p className="text-slate-300 mb-6">{message}</p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 px-4 py-2 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${
              isDangerous
                ? 'bg-red-600 hover:bg-red-700 disabled:bg-slate-700 text-white'
                : 'bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-700 text-slate-900'
            }`}
          >
            {isLoading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                {isDangerous ? 'Deleting...' : 'Confirming...'}
              </>
            ) : (
              isDangerous ? 'Delete' : 'Confirm'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

function ChangeRoleModal({
  user,
  onClose,
  onConfirm,
  isLoading,
}: {
  user: any
  onClose: () => void
  onConfirm: (role: string) => void
  isLoading: boolean
}) {
  const [selectedRole, setSelectedRole] = useState(user.role)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-lg border border-slate-800 max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Change User Role</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-slate-300 mb-4">
          Current role: <span className="font-semibold text-cyan-300">{user.role.replace('_', ' ')}</span>
        </p>

        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 mb-6"
        >
          <option value="super_admin">Super Admin</option>
          <option value="admin">Admin</option>
          <option value="operator">Operator</option>
        </select>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(selectedRole)}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-700 text-slate-900 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Updating...
              </>
            ) : (
              'Update Role'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
