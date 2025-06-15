
'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users as UsersIcon } from 'lucide-react';

export default function UsersPage() {
  // Placeholder data for users
  const users = [
    { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'Administrator' },
    { id: '2', name: 'Editor User', email: 'editor@example.com', role: 'Editor' },
    { id: '3', name: 'Viewer User', email: 'viewer@example.com', role: 'Viewer' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <section className="mb-12 md:mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <UsersIcon className="h-10 w-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-headline text-primary">
              Manage Users
            </h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
            View and manage user accounts and roles within the Aarambh Lookbook application.
          </p>
        </section>

        <section>
          <Card className="shadow-xl rounded-lg border-border/70">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">User List</CardTitle>
            </CardHeader>
            <CardContent>
              {users.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-border">
                    <thead className="bg-muted/50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</th>
                      </tr>
                    </thead>
                    <tbody className="bg-background divide-y divide-border">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{user.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{user.role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center text-muted-foreground">No users to display.</p>
              )}
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
