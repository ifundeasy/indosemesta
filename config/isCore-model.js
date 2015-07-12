var type = {
	id : String,
	name : String,
	isActive : Boolean,
	notes : String
};

var mapping = {
	id : String,
	username : String,
	password : String,
	name : String,
	domain : String,
	hosting : String,
	home : String,
	location : [
		{
			addr : String,
			city : String,
			state : String,
			zipCode : String,
			country : String,
			coor : Array,
			email : Array,
			phone : Array,
			fax : Array,
			isActice : Boolean,
			notes : String
		}
	],
	isActice : Boolean,
	notes : String,

	"type.id" : type.id,
	"type.name" : type.name,
	"type.isActive" : type.isActive,
	"type.notes" : type.notes
};