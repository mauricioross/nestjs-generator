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
    console.log(
        'Congratulations, your extension "nestjs-generator" is now active!'
    );

    let disposable = vscode.commands.registerCommand(
        "nestjs-generator.nestCode",
        function (props) {
            const path = props.path;
            const dir = path.split("/");
            const filePath = dir.join("/") + "/";

            vscode.window
                .showInformationMessage(
                    "Get Started with NestJs Generator!",
                    "OK",
                    "Cancel"
                )
                .then((value) => {
                    if (value === "OK") {
                        // vscode.window.showInformationMessage("OK");
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

                                await fs.mkdirSync(filePath + "dto");
                                await fs.mkdirSync(filePath + "entities");
                                await fs.mkdirSync(filePath + "schemas");

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
