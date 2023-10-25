import {Route, Routes} from "react-router-dom";
import {CompanyLayout} from "../shared/layout/CompanyLayout";
import {DashboardPage} from "../pages/dashboard/DashboardPage";
import {CreateWorkplacePage} from "../pages/workplaceModule/CreateWorkplacePage";
import {SearchWorkplacePage} from "../pages/workplaceModule/SearchWorkplacePage";
import {EditCompanyPage} from "../../admin/pages/companyModule/EditCompanyPage";
import {EditWorkplacePage} from "../pages/workplaceModule/EditWorkplacePage";
import {EditHealthAndSafetyPolicyPage} from "../pages/healthAndSafetyPolicyModule/EditHealthAndSafetyPolicyPage";


export const CompanyRouter = () => {

   return(
       <Routes>
           <Route path="/*" element={<CompanyLayout />}>
               <Route path="dashboard" element={<DashboardPage />} />

               <Route path="crear-centro-trabajo" element={<CreateWorkplacePage/>} />
               <Route path="centros-de-trabajo" element={<SearchWorkplacePage />} />
               <Route path="centro-trabajo/:id" element={<EditWorkplacePage />} />
               <Route path="politica-seguridad-y-salud" element={<EditHealthAndSafetyPolicyPage />} />
           </Route>
       </Routes>
   )
}