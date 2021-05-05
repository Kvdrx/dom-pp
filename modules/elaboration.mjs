import { StringBuilder } from './stringBuilder.mjs'
class Elaboration {
	constructor() {

	}
	getShort() {
		return null
	}
	getLong() {
		return null
	}
}

class ConstantElaboration extends Elaboration {
	constructor(o) {
		super()
		this.object = o
	}
	getShort() {
		return this
	}

	getLong() {
		return this
	}

	toString() {
		return this.object.toString()
	}
}

class ComposedElaboration extends Elaboration {
	/**
	 * The elements of the elaboration.
	 */
	parts = [];

	static create(short_e, [...parts]) {
		if (parts.length == 0) {
			return short_e;
		}
		return new ComposedElaboration(short_e, parts);
	}

	constructor(short_e, [...parts]) {
		super();
		this.short_e = short_e
		for (var part of parts) {
			if (part instanceof Elaboration) {
				this.parts.push(part);
			}
			else {
				this.parts.push(new ConstantElaboration(part));
			}
		}
	}

	add(e) {
		this.parts.push(e)
	}

	getShort() {
		return this.short_e;
	}

	getLong() {
		if (this.parts == []) {
			return this;
		}
		return this.short_e;
	}

	toString() {
		if (this.parts == []) {
			return this.short_e.toString();
		}
		var out = new StringBuilder();
		for (let i = 0; i < this.parts.size(); i++) {
			if (i > 0) {
				out.append(", ");
			}
			out.append(this.parts.get(i).getShort());
		}
		return out.toString();
	}
}

class AndElaboration extends ComposedElaboration {
	constructor(short_e, [...parts]) {
		super(short_e, parts);
	}

	toString() {
		if (this.parts == []) {
			return this.short_e.toString();
		}
		var out = new StringBuilder();
		for (let i = 0; i < this.parts.size(); i++) {
			if (i > 0) {
				out.append(" and ");
			}
			out.append(this.parts.get(i).getShort());
		}
		return out.toString();
	}
}

class OrElaboration extends ComposedElaboration {
	constructor(short_e, [...parts]) {
		super(short_e, parts);
	}

	toString() {
		if (this.parts == []) {
			return this.short_e.toString();
		}
		var out = new StringBuilder();
		for (let i = 0; i < this.parts.size(); i++) {
			if (i > 0) {
				out.append(" or ");
			}
			out.append(this.parts.get(i).getShort());
		}
		return out.toString();
	}
}

/**
 * Package exports
 */
export { AndElaboration, Elaboration, ConstantElaboration, ComposedElaboration, OrElaboration }