const fs = require("fs");

// Definir el objeto JSON con los datos de las propiedades del DTO
const jsonSchema = {
    name: "string",
    age: "number",
    email: "string",
};
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateFileDTO(filePath, fileName, nameObject, fileContent) {
    // Generar el contenido del archivo DTO
    const dtoContent = generateDtoContent(jsonSchema);

    // Definir el nombre del archivo y el contenido completo
    fileName = nameObject + ".dto.ts";
    fileContent = `export class ${
        nameObject.charAt(0).toUpperCase() +
        nameObject.slice(1, nameObject.length)
    }Dto {\n${dtoContent}}\n`;

    // Escribir el contenido en el archivo
    fs.writeFile(filePath + fileName, fileContent, (err) => {
        if (err) {
            console.error("Error al generar el archivo DTO:", err);
        } else {
            console.log("Archivo DTO generado exitosamente:", fileName);
        }
    });
}
// Ejemplo de generación de DTO
function generateDtoContent(jsonSchema) {
    let content = "";

    for (const key in jsonSchema) {
        const type = jsonSchema[key];
        content += `  ${key}: ${type};\n`;
    }

    return content;
}
function generateDTO(data, nameObject,path) {
    // let dtoContent = "";
    const dtoContent = generateDtoContent(data);

    // Definir el nombre del archivo y el contenido completo
    const fileName = 'dto/'+nameObject+".dto.ts";
    const fileContent = `export class ${capitalize(nameObject)}Dto {\n${dtoContent}}\n`;
    // Escribir el contenido en el archivo
    fs.writeFile(path+fileName, fileContent, (err) => {
        if (err) {
            console.error("Error al generar el archivo DTO:", err);
        } else {
            console.log("Archivo DTO generado exitosamente:", fileName);
        }
    });

    return dtoContent;
}

// Ejemplo de generación de Entity
function generateEntity(data, nameObject,path) {
    let entityContent = "";

    entityContent += `import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';\n\n`;
    entityContent += `@Entity()\n`;
    entityContent += `export class ${capitalize(nameObject)} {\n\n`;

    Object.keys(data).forEach((key) => {
        const type = data[key];
        entityContent += `  @Column()\n  ${key}: ${type};\n\n`;
    });

    entityContent += `  @PrimaryGeneratedColumn()\n  id: number;\n\n`;
    entityContent += `}\n`;
    const fileName = 'entities/'+nameObject+".entity.ts";
    fs.writeFile(path+fileName, entityContent, (err) => {
        if (err) {
            console.error("Error al generar el archivo Entity:", err);
        } else {
            console.log("Archivo Entity generado exitosamente:", fileName);
        }
    });
    // return entityContent;
}

// Ejemplo de generación de Service
function generateService(data, nameObject,path) {
    let serviceContent = "";

    serviceContent += `import { Injectable } from '@nestjs/common';\n`;
    serviceContent += `import { InjectModel } from '@nestjs/mongoose';\n`;
    serviceContent += `import { Model } from 'mongoose';\n`;
    serviceContent += `import { ${capitalize(nameObject)} } from './schemas/${
        nameObject
    }.schema';\n\n`;
    serviceContent += `@Injectable()\n`;
    serviceContent += `export class ${capitalize(nameObject)}Service {\n\n`;
    serviceContent += `  constructor(@InjectModel(${capitalize(
        nameObject
    )}.name) private readonly ${nameObject.toLowerCase()}Model: Model<${capitalize(
        nameObject
    )}>) {}\n\n`;
    serviceContent += `  // Métodos del servicio\n\n`;
    serviceContent += `}\n`;

    const fileName = nameObject+".service.ts";
    fs.writeFile(path+fileName, serviceContent, (err) => {
        if (err) {
            console.error("Error al generar el archivo service:", err);
        } else {
            console.log("Archivo service generado exitosamente:", fileName);
        }
    });
}

// Ejemplo de generación de Controller
function generateController(data, nameObject,path) {
    let controllerContent = "";

    controllerContent += `import { Controller } from '@nestjs/common';\n\n`;
    controllerContent += `@Controller('${nameObject.toLowerCase()}')\n`;
    controllerContent += `export class ${capitalize(
        nameObject
    )}Controller {\n\n`;
    controllerContent += `  // Métodos del controlador\n\n`;
    controllerContent += `}\n`;

    const fileName = nameObject+".controller.ts";
    fs.writeFile(path+fileName, controllerContent, (err) => {
        if (err) {
            console.error("Error al generar el archivo controller:", err);
        } else {
            console.log("Archivo controller generado exitosamente:", fileName);
        }
    });
}

// Ejemplo de generación de Schema
function generateSchema(data, nameObject,path) {
    let schemaContent = "";

    schemaContent += `import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';\n`;
    schemaContent += `import { Document } from 'mongoose';\n\n`;
    schemaContent += `export type ${capitalize(
        nameObject
    )}Document = ${capitalize(nameObject)} & Document;\n\n`;
    schemaContent += `@Schema()\n`;
    schemaContent += `export class ${capitalize(nameObject)} {\n\n`;

    Object.keys(data).forEach((key) => {
        const type = data[key];
        schemaContent += `  @Prop()\n  ${key}: ${type};\n\n`;
    });

    schemaContent += `}\n\n`;
    schemaContent += `export const ${capitalize(
        nameObject
    )}Schema = SchemaFactory.createForClass(${capitalize(nameObject)});\n`;

    const fileName = 'schemas/'+nameObject+".schema.ts";
    fs.writeFile(path+fileName, schemaContent, (err) => {
        if (err) {
            console.error("Error al generar el archivo schema:", err);
        } else {
            console.log("Archivo schema generado exitosamente:", fileName);
        }
    });
}
// Ejemplo de generación de Module

module.exports = {
    generateFileDTO,
    generateDTO,
    generateEntity,
    generateService,
    generateController,
    generateSchema,
};
