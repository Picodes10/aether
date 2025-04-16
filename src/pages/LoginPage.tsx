
import MainLayout from "@/components/Layout/MainLayout";
import LoginForm from "@/components/Auth/LoginForm";

const LoginPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <LoginForm />
      </div>
    </MainLayout>
  );
};

export default LoginPage;
