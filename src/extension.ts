import * as vscode from 'vscode';

export async function activate(context: vscode.ExtensionContext) {
	// Register the commands
	context.subscriptions.push(
		vscode.commands.registerCommand('treeviewmenurefresh.firstCommand', async () => {
			vscode.window.showInformationMessage('First Command!');
			await setEnabledCommand('second');
		}),
		vscode.commands.registerCommand('treeviewmenurefresh.secondCommand', async () => {
			vscode.window.showInformationMessage('Second Command!');
			await setEnabledCommand('first');
		}),
	);

	// Register the tree view
	context.subscriptions.push(
		vscode.window.registerTreeDataProvider('testView', new TestTreeProvider())
	);

	await setEnabledCommand('first');
}

export function deactivate() { }

class TestTreeProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
	async getChildren(): Promise<vscode.TreeItem[]> {
		return [];
	}
	getTreeItem(item: vscode.TreeItem): vscode.TreeItem {
		return item;
	}
}

async function setEnabledCommand(type: string): Promise<void> {
	await vscode.commands.executeCommand(
		'setContext',
		'treeviewmenurefresh.enabledCommand',
		type
	);
}