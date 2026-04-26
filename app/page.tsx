import React from 'react';
import Layout from '@/components/ui/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-neutral-900">
            Algorithm Demonstration
          </h1>
          <p className="text-lg text-neutral-700 max-w-2xl">
            Explore and understand fundamental algorithms through interactive
            visualizations and detailed step-by-step explanations.
          </p>
        </div>

        {/* Featured Algorithms */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-neutral-900">
                Sorting Algorithms
              </h2>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-700 mb-4">
                Learn about various sorting techniques including bubble sort,
                quick sort, and merge sort with visual demonstrations.
              </p>
              <Button variant="primary" size="md" className="w-full">
                Explore Sorting
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-neutral-900">
                Search Algorithms
              </h2>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-700 mb-4">
                Master binary search, linear search, and other search
                techniques with step-by-step walkthroughs.
              </p>
              <Button variant="primary" size="md" className="w-full">
                Explore Search
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-neutral-900">
                Graph Algorithms
              </h2>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-700 mb-4">
                Understand graph traversal, shortest path, and tree algorithms
                through interactive visualizations.
              </p>
              <Button variant="primary" size="md" className="w-full">
                Explore Graphs
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold text-neutral-900">
              Getting Started
            </h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-neutral-700">
                Welcome to the Algorithm Demonstration App. This platform
                provides interactive visualizations to help you understand how
                different algorithms work step by step.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="md">
                  Start Learning
                </Button>
                <Button variant="secondary" size="md">
                  View Documentation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default HomePage;