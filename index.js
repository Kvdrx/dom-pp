/*
  A lineage library for DOM nodes
  MIT License
  
  Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
  Eckinox Média and Université du Québec à Chicoutimi
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

/**
 * Imports
 */
require("data-tree");

/**
 * Export
 */
module.exports = evaluateDom;

/**
 * Evaluates a set of conditions on a DOM tree
 * @param root A DOM node corresponding to the root of the page
 * @param conditions A list of {@link Function}, each corresponding to a
 * Boolean condition to evaluate on the page.
 * @return An array of data trees corresponding to the explanation for
 * each condition that evaluates to <tt>false</tt>.
 */
function evaluateDom(root, conditions = [])
{
	var verdicts = [];
	for (var i = 0; i < conditions.length; i++)
	{
		var verdict = getVerdict(root, conditions[i]);
		if (verdict != null)
		{
			verdicts.push(verdict);
		}
	}
	return verdicts;
};

/**
 * Evaluates a single condition on a DOM tree. <strong>This is a stub for
 * testing purposes.</strong>
 * @param root A DOM node corresponding to the root of the page
 * @param conditions A {@link Function} that corresponds to a
 * Boolean condition to evaluate on the page.
 * @return A data tree explaining the violation of the condition if it
 * evaluates to <tt>false</tt>, and <tt>null</tt> if the condition is fulfilled.
 */
function getVerdict(root, condition)
{
	// Create a "fake" data tree
	var tree = dataTree.create();
	var n1 = tree.insert({
		type: "OR"});
	var n2 = tree.insertToNode(n1, {
		type: "object",
	  part: ["width"],
	  subject: "body[1]/section[2]/div[1]"});
	var n3 = tree.insertToNode(n1, {
		type: "AND"});
	var n4 = tree.insertToNode(n3, {
		type: "object",
	  part: ["characters 2-10", "text"],
	  subject: "body[1]/div[2]"});
	var n5 = tree.insertToNode(n3, "OR");
	var n6 = tree.insertToNode(n5, {
		type: "object",
	  part: ["value of"],
	  subject: "constant 100"});
	var n7 = tree.insertToNode(n5, {
		type: "object",
	  part: ["width"],
	  subject: "body[1]/section[2]/div[1]"});
	var n8 = tree.insertToNode(n3, {
		type: "object",
	  part: ["width"],
	  subject: "body[1]/section[2]/div[1]"});
	return tree;
};

// :wrap=soft:tabSize=2: