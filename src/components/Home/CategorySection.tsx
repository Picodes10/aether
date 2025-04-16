
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { mockCategories } from "@/data/mockData";
import { BookOpen } from "lucide-react";

const CategorySection = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-quiz-dark mb-4">Explore Quiz Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover a wide range of quiz categories to test your knowledge in different fields.
            Challenge yourself and become an expert in your favorite subjects!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCategories.map((category) => (
            <Link key={category.id} to={`/quizzes?category=${category.name}`}>
              <Card className="quiz-card quiz-card-hover overflow-hidden h-full">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                    {category.imageUrl ? (
                      <img 
                        src={category.imageUrl} 
                        alt={category.name} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full w-full bg-quiz-gradient">
                        <BookOpen className="h-16 w-16 text-white opacity-70" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-semibold text-quiz-dark">{category.name}</h3>
                      <span className="bg-quiz-light text-quiz-primary text-xs font-medium px-2 py-1 rounded-full">
                        {category.quizCount} {category.quizCount === 1 ? 'Quiz' : 'Quizzes'}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                    <div className="flex justify-end">
                      <span className="text-quiz-primary font-medium text-sm flex items-center">
                        Explore Quizzes
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
