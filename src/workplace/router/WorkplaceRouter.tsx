import {Route, Routes} from "react-router-dom";
import {WorkplaceLayout} from "../shared/layout/WorkplaceLayout";
import {DashboardPage} from "../modules/dashboard/DashboardPage";
import {BaselineStudyPage} from "../modules/baselineStudyModule/BaselineStudyPage";
import {CreateProcessPage} from "../modules/processModule/CreateProcessPage";
import {SearchProcessPage} from "../modules/processModule/SearchProcessPage";
import {EditProcessPage} from "../modules/processModule/EditProcessPage";
import {ProcessPage} from "../modules/processModule/ProcessPage";
import {CreateProcessActivityPage} from "../modules/processModule/CreateProcessActivityPage";
import {EditProcessActivityPage} from "../modules/processModule/EditProcessActivityPage";
import {ActivityPage} from "../modules/processModule/ActivityPage";
import {CreateProcessActivityTaskPage} from "../modules/processModule/CreateProcessActivityTaskPage";
import {EditProcessActivityTaskPage} from "../modules/processModule/EditProcessActivityTaskPage";
import {TaskPage} from "../modules/processModule/TaskPage";
import {RiskPage} from "../modules/occupationalRisk/page/RiskPage";



export const WorkplaceRouter = () => {

   return(
       <Routes>
           <Route path="/*" element={<WorkplaceLayout />}>
               <Route path="dashboard" element={<DashboardPage />} />
               <Route path="estudio-linea-base" element={<BaselineStudyPage/>}/>

               <Route path="crear-proceso" element={<CreateProcessPage/>}/>
               <Route path="procesos" element={<SearchProcessPage/>}/>
               <Route path="editar-proceso/:id" element={<EditProcessPage/>}/>
               <Route path="proceso/:id" element={<ProcessPage/>}/>
               {/*ProcessActivity*/}
               <Route path="proceso/:processId/crear-actividad" element={<CreateProcessActivityPage/>}/>
               <Route path={"editar-actividad-de-proceso/:activityId"} element={<EditProcessActivityPage/>}/>
               {/* ActivityTasks */}
               <Route path="actividad/:id" element={<ActivityPage/>}/>
               <Route path="actividad/:activityId/crear-tarea" element={<CreateProcessActivityTaskPage/>}/>
               <Route path="actividad/:activityId/editar-tarea/:taskId" element={<EditProcessActivityTaskPage/>}/>

               {/* Tasks */}
               <Route path="tarea/:id" element={<TaskPage/>}/>

               {/* OccupationalRiskModule */}
               <Route path="riesgo/:id" element={<RiskPage/>}/>

           </Route>
       </Routes>
   )
}