versionCompare
==========

[![Build Status](https://travis-ci.org/kamilkisiela/version-compare.svg?branch=master)](https://travis-ci.org/kamilkisiela/version-compare)
[![codecov.io](https://codecov.io/github/kamilkisiela/version-compare/coverage.svg?branch=master)](https://codecov.io/github/kamilkisiela/version-compare?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/grade/3a3da42a24b043a4b0d9ffa5b342a4fd)](https://www.codacy.com/app/mys-sterowiec/version-compare)

Compare semantic versions or get them as integers.

## API
 
### gt *( a:string, b: string ) : boolean*

A greater then B

### gte *( a:string, b: string ) : boolean*

A greater then B or equal

### lt *( a:string, b: string ) : boolean*

A lower then B

### lte *( a:string, b: string ) : boolean*

A lower then B or equal

### eq *( a:string, b: string ) : boolean*

A equals B

### compare *( a:string, operator:string, b: string ) : boolean*

Available operators: `>`, `<`, `=`.

### parse *( a:string, b:string) : {a: (integer), b: (integer)}*

Creates integer representation of versions.
 
How it parses? 

- "1.2.0" becomes 120
- "1.13.2" becomes 1132
- "1.2.0-RC2" becomes 120
- "METEOR@1.2.3-RC" becomes 123

So it basically leaves only numbers and parse them into integer type.

That's not all. Each split (by dot symbol) has different length, function adds leading zeros.

"1.2.0" and "1.2.0.2" becomes 1200 and 1202.

## Usage

```javascript
versionCompare.gt("METEOR@1.2.3", "1.2.0") // true
versionCompare.gte("METEOR@1.2.3", "1.2.0") // true
```