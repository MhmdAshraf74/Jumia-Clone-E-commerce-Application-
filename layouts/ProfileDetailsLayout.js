// import UserNavigate from "@/components/UserNavigate/UserNavigate";

import UserNavigate from "@/components/UserNavigate/UserNavigate";
import { useTranslation } from "next-i18next";
function ProfileDetailsLayout({ children }) {
  const { t } = useTranslation("user");

  return (
    <main className="bg-white">
      <div className="container mx-auto  grid gap-3 md:grid-cols-12  p-10 bg-white h-screen  ">
        <div className="shadow-md  p-5 col-span-12 md:col-span-4">
          <UserNavigate />
        </div>
        <div className="shadow-md p-10 col-span-12 md:col-span-8">
          {children}
        </div>
      </div>
    </main>
  );
}

export default ProfileDetailsLayout;
export const userManagementLayout = (page) => (
  <ProfileDetailsLayout>{page}</ProfileDetailsLayout>
);
ProfileDetailsLayout.getLayout = userManagementLayout;
