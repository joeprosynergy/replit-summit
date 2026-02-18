"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Loader2, 
  ArrowLeft,
  Users,
  UserCheck,
  UserX,
  Shield
} from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { authFetch } from "@/lib/authFetch";

interface UserProfile {
  id: string;
  user_id: string;
  email: string;
  display_name: string | null;
  approval_status: "pending" | "approved" | "rejected";
  approved_by: string | null;
  approved_at: string | null;
  created_at: string;
  is_super_admin?: boolean;
}

type ActionType = "approve" | "reject" | null;

const AdminUsers = () => {
  const router = useRouter();
  const { user, isAdmin, isLoading: authLoading } = useAdminAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionUser, setActionUser] = useState<UserProfile | null>(null);
  const [actionType, setActionType] = useState<ActionType>(null);
  const [isActioning, setIsActioning] = useState(false);

  // Redirect if not admin
  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push("/admin/login");
    }
  }, [user, isAdmin, authLoading, router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await authFetch("/api/admin/users");
        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          setError(data.error || "Failed to fetch users");
          return;
        }
        const data = await response.json();
        setUsers(data.users || []);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setIsLoading(false);
      }
    };

    if (user && isAdmin) {
      fetchUsers();
    }
  }, [user, isAdmin]);

  const handleAction = async () => {
    if (!actionUser || !actionType) return;
    
    setIsActioning(true);
    
    try {
      const response = await authFetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileId: actionUser.id, action: actionType }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error || "Failed to update user");
        return;
      }

      const { newStatus } = await response.json();

      setUsers(users.map(u => 
        u.id === actionUser.id 
          ? { ...u, approval_status: newStatus, approved_by: user?.id || null, approved_at: new Date().toISOString() }
          : u
      ));
    } catch (err) {
      setError("Failed to update user");
    } finally {
      setIsActioning(false);
      setActionUser(null);
      setActionType(null);
    }
  };

  const pendingUsers = users.filter(u => u.approval_status === "pending");
  const approvedUsers = users.filter(u => u.approval_status === "approved");
  const rejectedUsers = users.filter(u => u.approval_status === "rejected");

  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="w-3 h-3 mr-1" /> Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100"><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
    }
  };

  const UserTable = ({ userList, showActions = false }: { userList: UserProfile[], showActions?: boolean }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Requested</TableHead>
          {showActions && <TableHead className="text-right">Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {userList.length === 0 ? (
          <TableRow>
            <TableCell colSpan={showActions ? 5 : 4} className="text-center text-muted-foreground py-8">
              No users found
            </TableCell>
          </TableRow>
        ) : (
          userList.map((userProfile) => (
            <TableRow key={userProfile.id}>
              <TableCell className="font-medium">
                {userProfile.display_name || "—"}
                {userProfile.is_super_admin && (
                  <Badge variant="outline" className="ml-2 text-xs"><Shield className="w-3 h-3 mr-1" /> Super Admin</Badge>
                )}
              </TableCell>
              <TableCell>{userProfile.email}</TableCell>
              <TableCell><StatusBadge status={userProfile.approval_status} /></TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(userProfile.created_at).toLocaleDateString()}
              </TableCell>
              {showActions && (
                <TableCell className="text-right">
                  {!userProfile.is_super_admin && (
                    <div className="flex gap-2 justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        onClick={() => {
                          setActionUser(userProfile);
                          setActionType("approve");
                        }}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => {
                          setActionUser(userProfile);
                          setActionType("reject");
                        }}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen bg-muted/30">
        <div className="container-custom">
          <div className="mb-8">
            <Button variant="ghost" onClick={() => router.push("/admin")} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Admin
            </Button>
            
            <h1 className="text-3xl font-bold text-foreground mb-2">User Management</h1>
            <p className="text-muted-foreground">
              Approve or reject user access requests. Approved users will have admin access.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-800">
              {error}
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{users.length}</p>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{pendingUsers.length}</p>
                    <p className="text-sm text-muted-foreground">Pending</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <UserCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{approvedUsers.length}</p>
                    <p className="text-sm text-muted-foreground">Approved</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <UserX className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{rejectedUsers.length}</p>
                    <p className="text-sm text-muted-foreground">Rejected</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Users Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>
                Review and manage user access requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="pending">
                <TabsList className="mb-4">
                  <TabsTrigger value="pending" className="gap-2">
                    <Clock className="w-4 h-4" />
                    Pending ({pendingUsers.length})
                  </TabsTrigger>
                  <TabsTrigger value="approved" className="gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Approved ({approvedUsers.length})
                  </TabsTrigger>
                  <TabsTrigger value="rejected" className="gap-2">
                    <XCircle className="w-4 h-4" />
                    Rejected ({rejectedUsers.length})
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="pending">
                  <UserTable userList={pendingUsers} showActions />
                </TabsContent>
                
                <TabsContent value="approved">
                  <UserTable userList={approvedUsers} />
                </TabsContent>
                
                <TabsContent value="rejected">
                  <UserTable userList={rejectedUsers} showActions />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />

      {/* Confirmation Dialog */}
      <AlertDialog open={!!actionUser && !!actionType} onOpenChange={() => { setActionUser(null); setActionType(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionType === "approve" ? "Approve User?" : "Reject User?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {actionType === "approve" ? (
                <>
                  This will grant <strong>{actionUser?.display_name || actionUser?.email}</strong> admin access to the system. They will be able to edit pages and content.
                </>
              ) : (
                <>
                  This will deny <strong>{actionUser?.display_name || actionUser?.email}</strong> access to the admin system. They will not be able to log in.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isActioning}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleAction}
              disabled={isActioning}
              className={actionType === "approve" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
            >
              {isActioning ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : actionType === "approve" ? (
                <CheckCircle className="w-4 h-4 mr-2" />
              ) : (
                <XCircle className="w-4 h-4 mr-2" />
              )}
              {actionType === "approve" ? "Approve" : "Reject"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AdminUsers;
