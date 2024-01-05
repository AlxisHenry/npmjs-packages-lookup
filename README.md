# NPM Packages lookup 🎓

This project is a simple NPM packages lookup. It allows you to get all dependencies used by all of the dependencies present in the `package.json` file of a project. It also allows you to specify needles to search for in the dependencies.

## Table of contents

- [Table of contents](#table-of-contents)
- [How to use it ?](#how-to-use-it-)
- [Technical guide](#technical-guide)
- [Technologies](#technologies)
- [Authors](#authors)

## How to use it ?

If you want to use the project into your own project, you can only retrieve the two files you need to use the project:

```bash
$ wget https://raw.githubusercontent.com/AlxisHenry/npmjs-packages-lookup/main/index.js
$ wget https://raw.githubusercontent.com/AlxisHenry/npmjs-packages-lookup/main/search.json
```

Then, you can use the `index.js` file in your own project.

```bash
$ node index.js
```

If you want to setup specific needles to search for, you can edit the `search.json` file and add your own needles.

**Note:** The `search.json` file must be an array of strings and the search is performed with the `includes` method.

```json
{
  "needles": ["needle1", "needle2", "needle3"]
}
```

## Technical guide

Clone the repository

```bash
$ git clone https://github.com/AlxisHenry/npmjs-packages-lookup.git
```

Run the `index.js` file

```bash
$ node index.js
```

Follow the _[How to use it ?](#how-to-use-it-)_ section to have a better understanding of the project.

## Technologies

![](https://img.shields.io/badge/javascript-%252320232a.svg?style=for-the-badge&logo=javascript&color=20232a)

## Authors

- [@AlxisHenry](https://github.com/AlxisHenry)
