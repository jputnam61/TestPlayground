import { useState, useCallback, useEffect } from 'react';
import { ChevronDown, Download, Info, MoreHorizontal, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
}

const roles = ['All', 'Admin', 'User', 'Manager'];
const statuses = ['All', 'Active', 'Inactive', 'Pending'];

const PAGE_SIZE = 10;

export function DataGridPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isHelperOpen, setIsHelperOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User;
    direction: 'asc' | 'desc';
  }>({ key: 'id', direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [editingCell, setEditingCell] = useState<{
    id: number;
    field: keyof User;
  } | null>(null);

  // Simulate API call to fetch users
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate mock data
      const mockUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        role: ['Admin', 'User', 'Manager'][Math.floor(Math.random() * 3)],
        status: ['Active', 'Inactive', 'Pending'][Math.floor(Math.random() * 3)],
        lastActive: new Date(
          Date.now() - Math.floor(Math.random() * 10000000000)
        ).toISOString(),
      }));

      setUsers(mockUsers);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Filter and sort users
  const filteredUsers = users
    .filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = selectedRole === 'All' || user.role === selectedRole;
      const matchesStatus =
        selectedStatus === 'All' || user.status === selectedStatus;
      return matchesSearch && matchesRole && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      const direction = sortConfig.direction === 'asc' ? 1 : -1;
      return aValue > bValue ? direction : -direction;
    });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Handle sort
  const handleSort = (key: keyof User) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Handle row selection
  const handleSelectRow = (id: number) => {
    setSelectedRows((current) =>
      current.includes(id)
        ? current.filter((rowId) => rowId !== id)
        : [...current, id]
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    setSelectedRows((current) =>
      current.length === paginatedUsers.length
        ? []
        : paginatedUsers.map((user) => user.id)
    );
  };

  // Handle cell edit
  const handleCellEdit = (id: number, field: keyof User, value: string) => {
    setUsers((current) =>
      current.map((user) =>
        user.id === id ? { ...user, [field]: value } : user
      )
    );
    setEditingCell(null);
  };

  // Export data
  const handleExport = () => {
    const data = selectedRows.length
      ? users.filter((user) => selectedRows.includes(user.id))
      : users;
    const csv = [
      ['ID', 'Name', 'Email', 'Role', 'Status', 'Last Active'],
      ...data.map((user) => [
        user.id,
        user.name,
        user.email,
        user.role,
        user.status,
        user.lastActive,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users Data Grid</CardTitle>
        <CardDescription>
          Manage and view user data with advanced filtering and sorting
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="text-sm text-destructive font-medium mb-4">{error}</div>
        )}

        {/* Automation Helper - Enhanced visibility */}
        <Card className="border-2 border-primary/20 bg-card/50 shadow-lg">
          <Collapsible
            open={isHelperOpen}
            onOpenChange={setIsHelperOpen}
            className="w-full"
          >
            <div className="flex items-center justify-between space-x-4 p-4">
              <div className="flex items-center space-x-2">
                <Info className="h-5 w-5 text-primary" />
                <h4 className="text-lg font-semibold text-primary">
                  Automation Testing Guidelines
                </h4>
              </div>
              <CollapsibleTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-primary/20 hover:border-primary/40"
                >
                  <span className="mr-2">
                    {isHelperOpen ? 'Hide Guidelines' : 'View Guidelines'}
                  </span>
                  <ChevronDown
                    className="h-4 w-4 text-primary transition-transform duration-200"
                    style={{
                      transform: isHelperOpen ? 'rotate(-180deg)' : 'rotate(0)',
                    }}
                  />
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="px-4 pb-4">
              <div className="rounded-md border px-4 py-3 font-mono text-sm space-y-4">
                {/* Finding Unique Records */}
                <div>
                  <h5 className="font-bold mb-2 text-primary">1. Finding Unique Records</h5>
                  <div className="space-y-2">
                    <p className="text-muted-foreground">Challenge:</p>
                    <pre className="bg-muted p-2 rounded">
                      await grid.searchUser("user1"); // Multiple matches!
                    </pre>
                    <p className="text-muted-foreground">Solution:</p>
                    <pre className="bg-muted p-2 rounded">
{`// Combine multiple fields for unique identification
const user = await grid.findUser({
  name: "user1",
  email: "user1@example.com"
});`}
                    </pre>
                  </div>
                </div>

                {/* Pagination Awareness */}
                <div>
                  <h5 className="font-bold mb-2 text-primary">2. Pagination Awareness</h5>
                  <div className="space-y-2">
                    <p className="text-muted-foreground">Challenge:</p>
                    <pre className="bg-muted p-2 rounded">
                      await expect(page.getByText("user19")).toBeVisible(); // Fails
                    </pre>
                    <p className="text-muted-foreground">Solution:</p>
                    <pre className="bg-muted p-2 rounded">
{`// Method 1: Navigate through pages
while (await grid.hasNextPage()) {
  if (await grid.isUserVisible("user19")) break;
  await grid.nextPage();
}

// Method 2: Increase page size
await grid.setPageSize(50);`}
                    </pre>
                  </div>
                </div>

                {/* Dynamic Data Loading */}
                <div>
                  <h5 className="font-bold mb-2 text-primary">3. Dynamic Data Loading</h5>
                  <div className="space-y-2">
                    <p className="text-muted-foreground">Challenge:</p>
                    <pre className="bg-muted p-2 rounded">
                      await grid.getFirstRow(); // Data not loaded yet!
                    </pre>
                    <p className="text-muted-foreground">Solution:</p>
                    <pre className="bg-muted p-2 rounded">
{`// Wait for loading state to complete
await expect(page.getByTestId("loading-skeleton")).not.toBeVisible();

// Wait for specific data
await expect(page.getByTestId("user-row-1")).toBeVisible();

// Wait for grid to be interactive
await expect(grid.getRowsCount()).toBeGreaterThan(0);`}
                    </pre>
                  </div>
                </div>

                {/* Sorting and Filtering */}
                <div>
                  <h5 className="font-bold mb-2 text-primary">4. Sorting and Filtering</h5>
                  <div className="space-y-2">
                    <p className="text-muted-foreground">Challenge:</p>
                    <pre className="bg-muted p-2 rounded">
                      const firstUser = await grid.getFirstUser(); // Order unreliable
                    </pre>
                    <p className="text-muted-foreground">Solution:</p>
                    <pre className="bg-muted p-2 rounded">
{`// Explicitly set sort order before assertions
await grid.sortBy("name", "asc");
await grid.filterByRole("Admin");

// Now we can rely on the order
const firstUser = await grid.getFirstUser();
expect(firstUser.name).toBe("Aaron Admin");`}
                    </pre>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
              data-testid="search-input"
            />
          </div>
          <Select
            value={selectedRole}
            onValueChange={setSelectedRole}
            data-testid="role-filter"
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedStatus}
            onValueChange={setSelectedStatus}
            data-testid="status-filter"
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={handleExport}
            disabled={loading}
            data-testid="export-button"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Data Grid */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={
                      paginatedUsers.length > 0 &&
                      paginatedUsers.every((user) =>
                        selectedRows.includes(user.id)
                      )
                    }
                    onCheckedChange={handleSelectAll}
                    data-testid="select-all"
                  />
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort('id')}
                >
                  ID
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  Name
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort('email')}
                >
                  Email
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort('role')}
                >
                  Role
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  Status
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort('lastActive')}
                >
                  Last Active
                </TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                // Loading state
                Array.from({ length: PAGE_SIZE }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 8 }).map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-6 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : paginatedUsers.length === 0 ? (
                // Empty state
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                // Data rows
                paginatedUsers.map((user) => (
                  <TableRow key={user.id} data-testid={`user-row-${user.id}`}>
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.includes(user.id)}
                        onCheckedChange={() => handleSelectRow(user.id)}
                      />
                    </TableCell>
                    <TableCell>{user.id}</TableCell>
                    <TableCell
                      className="cursor-pointer"
                      onClick={() =>
                        setEditingCell({ id: user.id, field: 'name' })
                      }
                    >
                      {editingCell?.id === user.id &&
                      editingCell.field === 'name' ? (
                        <Input
                          value={user.name}
                          onChange={(e) =>
                            handleCellEdit(user.id, 'name', e.target.value)
                          }
                          onBlur={() => setEditingCell(null)}
                          autoFocus
                        />
                      ) : (
                        user.name
                      )}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.status}</TableCell>
                    <TableCell>
                      {new Date(user.lastActive).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            data-testid={`actions-${user.id}`}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              setEditingCell({ id: user.id, field: 'name' })
                            }
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() =>
                              setUsers((current) =>
                                current.filter((u) => u.id !== user.id)
                              )
                            }
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * PAGE_SIZE + 1} to{' '}
            {Math.min(currentPage * PAGE_SIZE, filteredUsers.length)} of{' '}
            {filteredUsers.length} entries
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              data-testid="prev-page"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              data-testid="next-page"
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}