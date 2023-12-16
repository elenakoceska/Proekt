const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const fileUpload = require("express-fileupload");
const config = require("./pkg/config");
require("./pkg/db");


