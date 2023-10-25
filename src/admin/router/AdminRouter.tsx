import {Route, Routes} from "react-router-dom";
import {CreateAdminPage, DashboardPage} from "../pages";
import {AdminLayout} from "../shared";
import {SearchAdminPage} from "../pages/adminModule/SearchAdminPage";
import {EditAdminPage} from "../pages/adminModule/EditAdminPage";
import {ProfileAdminPage} from "../pages/adminModule/ProfileAdminPage";
import {CreateCompanyPage} from "../pages/companyModule/CreateCompanyPage";
import {SearchCompanyPage} from "../pages/companyModule/SearchCompanyPage";
import {EditCompanyPage} from "../pages/companyModule/EditCompanyPage";
import {CreateAuditTypePage} from "../pages/auditTypeModule/CreateAuditTypePage";
import {SearchAuditTypePage} from "../pages/auditTypeModule/SearchAuditTypePage";

export const AdminRouter = () => {

    return(
        <Routes>
            <Route path="/*" element={<AdminLayout />}>
                <Route path="dashboard" element={<DashboardPage />} />
                {/*Admin*/}
                <Route path="createAdmin" element={<CreateAdminPage />} />
                <Route path="administradores" element={<SearchAdminPage />} />
                <Route path="administrador/:id" element={<EditAdminPage />} />
                <Route path="perfil/:id" element={<ProfileAdminPage />} />

                {/*Company*/}
                <Route path="empresa" element={<CreateCompanyPage />} />
                <Route path="empresas" element={<SearchCompanyPage />} />
                <Route path="empresa/:id" element={<EditCompanyPage />} />

                {/*AuditType*/}
                <Route path="tipo-auditoria" element={<CreateAuditTypePage/>}/>
                <Route path="tipo-auditoria-listado" element={<SearchAuditTypePage/>}/>

                <Route path="*" element={<DashboardPage />} />
            </Route>
        </Routes>

    )
}