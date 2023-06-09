// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const codeGenerator = require("./code-generator");
const fs = require("fs");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log(
        'Congratulations, your extension "nestjs-generator" is now active!'
    );

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand(
        "nestjs-generator.nestCode",
        function (props) {
            // The code you place here will be executed every time your command is executed
            // commandHandler();
            // Display a message box to the user
            const path = props.path;

            const dir = path.split("/");
            const fileName = dir.pop();
            const filePath = dir.join("/") + "/";

            vscode.window
                .showInformationMessage(
                    "Get Started with NestJs Generator!",
                    "OK",
                    "Cancel"
                )
                .then((value) => {
                    if (value === "OK") {
                        vscode.window
                            .showInputBox({
                                placeHolder: "Please enter name of Object",
                                value: "",
                            })
                            .then(async (value) => {
                              
                                const nameObject = value;
                                const jsonData = await fs
                                    .readFileSync(path)
                                    .toString();
                                const data = JSON.parse(jsonData);
                                
								await fs.mkdirSync(filePath+'dto');
								await fs.mkdirSync(filePath+'entities');
								await fs.mkdirSync(filePath+'schemas');

                                await codeGenerator.generateDTO(
                                    data,
                                    nameObject,
                                    filePath
                                );
                                await codeGenerator.generateEntity(
                                    data,
                                    nameObject,
                                    filePath
                                );
                                await codeGenerator.generateEntity(
                                    data,
                                    nameObject,
                                    filePath
                                );
                                await codeGenerator.generateService(
                                    data,
                                    nameObject,
                                    filePath
                                );
                                await codeGenerator.generateController(
                                    data,
                                    nameObject,
                                    filePath
                                );
                                await codeGenerator.generateSchema(
                                    data,
                                    nameObject,
                                    filePath
                                );
                                // const entityContent = await
                                //     codeGenerator.generateEntity(path);
                                // const serviceContent = await
                                //     codeGenerator.generateService(path);
                                // const controllerContent = await
                                //     codeGenerator.generateController(path);
                                // const schemaContent = await
                                //     codeGenerator.generateSchema(path);
                                // const moduleContent = await codeGenerator.generateModule(filePath);

                                // fs.writeFileSync(
                                //     nameObject + ".dto.ts",
                                //     dtoContent
                                // );
                                // fs.writeFileSync(nameObject+".entity.ts", entityContent);
                                // fs.writeFileSync(nameObject+".service.ts", serviceContent);
                                // fs.writeFileSync(
                                //     nameObject+".controller.ts",
                                //     controllerContent
                                // );
                                // fs.writeFileSync(nameObject+".schema.ts", schemaContent);
                            });
                    } else {
                        vscode.window.showInformationMessage("Cancel");
                    }
                });
        }
    );
    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate,
};
