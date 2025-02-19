import { Browser, Builder, By } from 'npm:selenium-webdriver@4.19.0'
import type {
	By as TBy,
	ThenableWebDriver,
} from 'npm:selenium-webdriver@4.19.0'

// @deno-types="https://cdn.skypack.dev/@types/lodash@4.17.4?dts"
import { isEmpty } from 'https://cdn.skypack.dev/lodash-es@4.17.21?dts'

import { join } from 'https://deno.land/std@0.224.0/path/mod.ts'
import { existsSync } from 'https://deno.land/std@0.224.0/fs/mod.ts'
import * as assert from 'https://deno.land/std@0.224.0/assert/mod.ts'

import Kia from 'https://deno.land/x/kia@0.4.1/mod.ts'
import {
	readJson,
	readJsonSync,
	writeJson,
	writeJsonSync,
} from 'https://deno.land/x/jsonfile@1.0.0/mod.ts'
import { nanoid } from 'https://deno.land/x/nanoid@v3.0.0/mod.ts'

export {
	assert,
	Browser,
	Builder,
	By,
	existsSync,
	isEmpty,
	join,
	Kia,
	nanoid,
	readJson,
	readJsonSync,
	writeJson,
	writeJsonSync,
}

export type { TBy, ThenableWebDriver }
