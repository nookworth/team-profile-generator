const Employee = require("./employee");

class Engineer extends Employee {
    constructor(name, id, email, gitHub){
    
    super(name, id, email);
    this.name = name;
    this.id = id;
    this.email = email;
    this.gitHub = gitHub;
    
    

}
    getName(){
        return this.name;
    }
    getId(){
        return this.id;
    }
    getEmail(){
        return this.email;
    }
    getGitHub(){
        return this.gitHub;
    }
    getRole() {
        return "Engineer";
    }
}

module.exports = Engineer;