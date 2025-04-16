
import MainLayout from "@/components/Layout/MainLayout";
import RegisterForm from "@/components/Auth/RegisterForm";

const RegisterPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <RegisterForm />
      </div>
    </MainLayout>
  );
};

export default RegisterPage;
