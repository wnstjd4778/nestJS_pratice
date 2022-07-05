import {ConfigModule} from "@nestjs/config";
import {join} from "path";
import authConfig from "./auth.config";
import adminConfig from "./admin.config";
import multerConfig from "./multer.config";
import {validationSchema} from "./validation-schema";

// imports: [
//     ConfigModule.forRoot({
//         envFilePath: [
//             join(
//                 __dirname,
//                 '../config',
//                 `.${process.env.NODE_ENV || 'development'}.env`,
//             ),
//         ],
//         load: [authConfig, adminConfig, multerConfig],
//         validationSchema,
//         isGlobal: true,
//     }),
