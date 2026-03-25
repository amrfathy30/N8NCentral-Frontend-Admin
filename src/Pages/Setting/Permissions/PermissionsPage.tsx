import { useTranslation } from 'react-i18next';
import DynamicTable from '../../../Components/Ui/DynamicTable';
import { useState } from 'react';
import Header from '../../../Components/Ui/Header';
import Button from '../../../Components/Ui/Button';
import RoleCard from './RoleCard';
import AddEmployeeModal from './AddEmployeeModal';
import EditRoleModal from './EditRoleModal';
import AddRoleModal from './AddRoleModal';
import EditPermissionModal from './EditPermissionModal';
import CreatePermissionModal from './CreatePermissionModal';
import ConfirmModal from '../../../Components/Ui/ConfirmModal';

interface Permission {
  name: string;
  granted: boolean;
}

interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}

interface PermissionItem {
  id: string;
  name: string;
}

interface Staff {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Suspended';
}

export default function PermissionsPage() {
  const { t, i18n } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("all");
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [isCreateRoleModalOpen, setIsCreateRoleModalOpen] = useState(false);
  const [selectedRoleForEdit, setSelectedRoleForEdit] = useState<Role | null>(null);

  const [employeeToDelete, setEmployeeToDelete] = useState<Staff | null>(null);
  const [employeeToToggle, setEmployeeToToggle] = useState<Staff | null>(null);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

  const [isCreatePermissionModalOpen, setIsCreatePermissionModalOpen] = useState(false);
  const [permissionToEdit, setPermissionToEdit] = useState<PermissionItem | null>(null);
  const [permissionToDelete, setPermissionToDelete] = useState<PermissionItem | null>(null);

  const dir = i18n.dir();

  const roles: Role[] = [
    {
      id: "Finance",
      name: "Finance",
      permissions: [
        { name: "Financials", granted: true },
        { name: "Analytics", granted: true },
        { name: "Dashboard", granted: false },
        { name: "Orders", granted: false },
        { name: "Users", granted: false },
        { name: "Services", granted: false },
      ]
    },
    {
      id: "Support",
      name: "Support",
      permissions: [
        { name: "Users", granted: true },
        { name: "Orders", granted: true },
        { name: "Dashboard", granted: false },
        { name: "Financials", granted: false },
        { name: "Analytics", granted: false },
        { name: "Services", granted: false },
      ]
    },
    {
      id: "SuperAdmin",
      name: "Super Admin",
      permissions: [
        { name: "Dashboard", granted: true },
        { name: "Users", granted: true },
        { name: "Services", granted: true },
        { name: "Orders", granted: true },
        { name: "Financials", granted: true },
        { name: "Analytics", granted: true },
      ]
    }
  ];

  const availablePermissions: PermissionItem[] = [
    { id: "1", name: "Dashboard" },
    { id: "2", name: "Users" },
    { id: "3", name: "Services" },
    { id: "4", name: "Orders" },
    { id: "5", name: "Financials" },
    { id: "6", name: "Analytics" },
  ];

  const staff: Staff[] = [
    { id: "1", name: "أحمد علي", email: "ahmed@n2n.com", role: "Super Admin", status: "Active" },
    { id: "2", name: "سارة محمد", email: "sara@n2n.com", role: "Support", status: "Active" },
    { id: "3", name: "خالد يوسف", email: "khaled@n2n.com", role: "Finance", status: "Suspended" },
  ];

  const columns = [
    {
      field: "name",
      header: t("Permissions.Name"),
      body: (rowData: Staff) => <span className="font-bold text-gray-800">{rowData.name}</span>
    },
    {
      field: "email",
      header: t("Permissions.Email"),
      body: (rowData: Staff) => <span className="text-gray-800">{rowData.email}</span>
    },
    {
      field: "role",
      header: t("Permissions.Role"),
      body: (rowData: Staff) => <span className="text-gray-800">{rowData.role}</span>
    },
    {
      field: "status",
      header: t("Permissions.Status"),
      body: (rowData: Staff) => (
        <span className={`px-4 py-1 rounded-full text-xs font-extrabold ${rowData.status === 'Active'
          ? 'bg-[#E8F5E9] text-greenDark'
          : 'bg-[#FF#F3F4F6EE] text-[#D32F2F]'
          }`}>
          {t(`Permissions.${rowData.status}`)}
        </span>
      )
    },
    {
      header: t("Permissions.Actions"),
      width: "200px",
      body: (rowData: Staff) => (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setEmployeeToToggle(rowData)}
            className="bg-white border border-[#DDDDDD] text-gray-600 px-3 py-1.5 rounded-[10px] font-semibold hover:bg-gray-50 hover:border-greenDark transition-all flex items-center gap-1"
          >
            {t("Permissions.ActivateDeactivate")}
          </button>
          <button
            onClick={() => setEmployeeToDelete(rowData)}
            className="bg-[#D32F2F] text-white py-1 px-2 rounded-[10px] hover:bg-opacity-90 transition-all"
          >
            {t("Permissions.delete")}
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-4" dir={dir}>
      {/* Header */}
      <div className="flex justify-between md:items-center flex-col md:flex-row gap-2">
        <Header title={t("Permissions.PermissionsManagement")} />
        <Button className="w-fit" onClick={() => setIsAddEmployeeModalOpen(true)}>
          {t("Permissions.AddNewEmployee")}
        </Button>
      </div>

      {/* Roles Section */}
      <div className="bg-white p-6 rounded-[16px] shadow-sm space-y-6">
        <div className="flex justify-between md:items-center flex-col md:flex-row gap-2">
          <h2 className="text-lg font-bold text-gray-800">{t("Permissions.AdminRoles")}</h2>
          <button
            onClick={() => setIsCreateRoleModalOpen(true)}
            className="bg-white border border-[#DDDDDD] text-black px-4 py-2 rounded-[10px] font-semibold hover:bg-gray-50 transition-all flex items-center gap-2 w-fit"
          >
            {t("Permissions.CreateNewRole")}
          </button>
        </div>
        <div className="flex flex-wrap gap-6">
          {roles.map(role => (
            <RoleCard
              key={role.id}
              role={role}
              t={t}
              onEdit={(id) => setSelectedRoleForEdit(roles.find(r => r.id === id) || null)}
              onDelete={(id) => setRoleToDelete(roles.find(r => r.id === id) || null)}
            />
          ))}
        </div>
      </div>

      {/* Available Permissions Section */}
      <div className="bg-white p-6 rounded-[16px] shadow-sm space-y-6">
        <div className="flex justify-between md:items-center flex-col md:flex-row gap-2">
          <h2 className="text-lg font-bold text-gray-800">{t("Permissions.AvailablePermissions")}</h2>
          <button
            onClick={() => setIsCreatePermissionModalOpen(true)}
            className="bg-white border border-[#DDDDDD] text-black px-4 py-2 rounded-[10px] font-semibold hover:bg-gray-50 transition-all flex items-center gap-2 w-fit"
          >
            {t("Permissions.CreateNewPermission")}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {availablePermissions.map(perm => (
            <div key={perm.id} className="flex items-center justify-between border border-[#E5E7EB] rounded-[10px] px-4 py-4 min-w-[200px] flex-1">
              <span className="font-semibold text-gray-800 text-[14px]">{t(`Permissions.${perm.name}`)}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPermissionToEdit(perm)}
                  className="text-black font-extrabold hover:border-greenDark transition-colors border border-[#DDDDDD] rounded-[10px]"
                >
                  <span className="text-[10px] px-2 block py-1">{t("Permissions.Edit")}</span>
                </button>
                <button
                  onClick={() => setPermissionToDelete(perm)}
                  className="text-white bg-[#D32F2F] font-extrabold hover:bg-opacity-90 transition-colors rounded-[10px]"
                >
                  <span className="text-[10px] px-2 block py-1">{t("Permissions.delete")}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Staff Management Section */}
      <div className="bg-white p-6 rounded-[16px shadow-sm space-y-6">
        <div className="flex justify-start">
          <h2 className="text-xl font-bold text-gray-800">{t("Permissions.StaffManagement")}</h2>
        </div>
        <div className="!p-0">
          <DynamicTable
            data={staff}
            columns={columns}
            showSearch={false}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>
      </div>

      <AddEmployeeModal
        isOpen={isAddEmployeeModalOpen}
        onClose={() => setIsAddEmployeeModalOpen(false)}
      />

      <AddRoleModal
        isOpen={isCreateRoleModalOpen}
        onClose={() => setIsCreateRoleModalOpen(false)}
      />

      <CreatePermissionModal
        isOpen={isCreatePermissionModalOpen}
        onClose={() => setIsCreatePermissionModalOpen(false)}
      />

      <EditRoleModal
        isOpen={!!selectedRoleForEdit}
        onClose={() => setSelectedRoleForEdit(null)}
        role={selectedRoleForEdit}
      />

      <ConfirmModal
        isOpen={!!employeeToDelete}
        onClose={() => setEmployeeToDelete(null)}
        title={t("Permissions.DeleteEmployeeTitle")}
        message={t("Permissions.DeleteEmployeeMessage")}
        isDanger={true}
        onConfirm={() => {
          console.log("Delete employee:", employeeToDelete);
          setEmployeeToDelete(null);
        }}
      />

      <ConfirmModal
        isOpen={!!employeeToToggle}
        onClose={() => setEmployeeToToggle(null)}
        title={t("Permissions.ToggleEmployeeTitle")}
        message={t("Permissions.ToggleEmployeeMessage")}
        isStop={true}
        onConfirm={() => {
          console.log("Toggle employee status:", employeeToToggle);
          setEmployeeToToggle(null);
        }}
      />

      <ConfirmModal
        isOpen={!!roleToDelete}
        onClose={() => setRoleToDelete(null)}
        title={t("Permissions.DeleteRoleTitle")}
        message={t("Permissions.DeleteRoleMessage")}
        isDanger={true}
        onConfirm={() => {
          console.log("Delete role:", roleToDelete);
          setRoleToDelete(null);
        }}
      />

      <EditPermissionModal
        isOpen={!!permissionToEdit}
        onClose={() => setPermissionToEdit(null)}
        permission={permissionToEdit}
      />

      <ConfirmModal
        isOpen={!!permissionToDelete}
        onClose={() => setPermissionToDelete(null)}
        title={t("Permissions.DeletePermissionTitle")}
        message={t("Permissions.DeletePermissionMessage")}
        isDanger={true}
        onConfirm={() => {
          console.log("Delete permission:", permissionToDelete);
          setPermissionToDelete(null);
        }}
      />
    </div>
  );
}
