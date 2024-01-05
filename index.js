import fs from "fs";

let search = false;
let needles = [];

if (fs.existsSync("./search.json")) {
	try {
		needles = JSON.parse(fs.readFileSync("./search.json", "utf8")).needles;
		if (needles.length > 0) search = true;
	} catch (e) { } lo
}

if (!fs.existsSync("./package.json")) {
	console.log("No package.json found");
	process.exit(1);
}

let dependencies = [];

try {
	let pckg = JSON.parse(fs.readFileSync("./package.json", "utf8"));
	dependencies = Object.keys({ ...pckg.dependencies, ...pckg.devDependencies });

	if (dependencies.length === 0) {
		console.log("No dependencies found");
		process.exit(1);
	}

} catch (e) {
	console.log("Error reading package.json");
	process.exit(1);
}

const highlightNeedles = (str) => {
	let highlightedStr = `\x1b[30m${str}`;

	if (search) {
		for (let needle of needles) {
			highlightedStr = highlightedStr.replace(
				new RegExp(needle, "g"),
				`\x1b[36m${needle}\x1b[30m`
			);
		}
	}

	return highlightedStr + "\x1b[0m";
};

for (const dependency of dependencies) {
	fetch(`https://registry.npmjs.org/${dependency}`)
		.then((result) => {
			return result.json();
		})
		.then((lib) => {
			if (lib.versions) {
				let latest = Object.keys(lib.versions).pop();
				let libDependencies = [
					...Object.keys(lib.versions[latest].dependencies || {}),
					...Object.keys(lib.versions[latest].devDependencies || {}),
				];

				let usedDependencies = [];

				libDependencies.forEach((dep) => {
					if (
						search &&
						needles.filter((needle) => dep.includes(needle)).length > 0
					) {
						usedDependencies.push(dep);
					} else if (!search) {
						usedDependencies.push(dep);
					}
				});

				if (usedDependencies.length > 0) {
					console.log(
						`\x1b[46m${dependency}\x1b[0m (${latest}) has ${libDependencies.length
						} dependencies and uses ${usedDependencies
							.map((dep) => highlightNeedles(dep))
							.join(", ")}.`
					);
				}
			}
		});
}
