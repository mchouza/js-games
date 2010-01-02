/*
Uses DPLL as described in  Cook and Mitchell "Finding Hard Instances of the
Satisfiability Problem: A Survey" p. 3
*/

"use strict";

var dpll = (function () {

	function simplifyClause(c, a) {
		var nc, i;
		nc = [];
		for (i = 0; i < c.length; i++) {
			if (c[i] in a) {
				return null;
			} else if (!(-c[i] in a)) {
				nc.push(c[i]);
			}
		}
		return nc;
	}

	function applyAssignment(f, a) {
		var nf, i, nc;
		nf = [];
		for (i = 0; i < f.length; i++) {
			nc = simplifyClause(f[i], a);
			if (nc !== null) {
				nf.push(nc);
			}
		}
		return nf;
	}
	
	function cloneAssignment(a) {
		var na, v;
		na = {};
		for (v in a) {
			na[v] = true;
		}
		return na;
	}

	function recDPLL(f, a) {
		var i, na, v, ret;
		f = applyAssignment(f, a);
		if (f.length === 0) {
			return [true, a];
		}
		for (i = 0; i < f.length; i++) {
			if (f[i].length === 0) {
				return [false, {}];
			} else if (f[i].length === 1) {
				na = cloneAssignment(a);
				na[f[i][0]] = true;
				return recDPLL(f, na);
			}
		}
		na = cloneAssignment(a);
		na[f[0][0]] = true;
		ret = recDPLL(f, na);
		if (ret[0]) {
			return ret;
		}
		delete na[f[0][0]];
		na[-f[0][0]] = true;
		return recDPLL(f, na);
	}
	
	return function (f, a) {
		if (!a) {
			a = {};
		}
		return recDPLL(f, a);
	};
}());
