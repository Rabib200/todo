'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { todoApi } from '@/lib/api';
import { Todo } from '@/types';

export default function TodoDetailPage() {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const fetchTodo = async () => {
    try {
      const response = await todoApi.getById(id);
      setTodo(response.data);
    } catch (error) {
      console.error('Failed to fetch todo:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) return;
    
    if (!user) {
      router.push('/');
      return;
    }
    if (id) {
      fetchTodo();
    }
  }, [user, id, router, isLoading]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this todo?')) return;
    try {
      await todoApi.delete(id);
      router.push('/todos');
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DONE':
        return 'bg-green-500';
      case 'IN_PROGRESS':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!todo) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
        <Card>
          <CardContent className="py-12">
            <p className="text-gray-500">Todo not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="outline"
          onClick={() => router.push('/todos')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Todos
        </Button>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle className="text-3xl mb-3">{todo.title}</CardTitle>
                <Badge className={getStatusColor(todo.status)}>
                  {todo.status.replace('_', ' ')}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push('/todos')}
                >
                  <Pencil className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <CardDescription className="text-base">
                {todo.description || 'No description provided'}
              </CardDescription>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <p className="text-sm text-gray-500">Created</p>
                <p className="font-medium">
                  {new Date(todo.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="font-medium">
                  {new Date(todo.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
