module.exports = {
    name: 'legit',
    description: 'Checks if ur IC is legit',
    execute(msg) {
        function is_valid_nric(n) {
            str1 = `${n}`
            for_s_t = "JZIHGFEDCBA"
             for_f_g = "XWUTRQPNMLK"
             checksum = (+str1.charAt(1) * 2) + (+str1.charAt(2) * 7) + (+str1.charAt(3)* 6) + (+str1.charAt(4) * 5) + (+str1.charAt(5) * 4) + (+str1.charAt(6) * 3) + (+str1.charAt(7) * 2);
             check = `${str1.charAt(8)}`;   
          
            check1 =  +for_s_t.indexOf(check);
         
            check2 =  +for_f_g.indexOf(check);
         
            if(str1.charAt(0) == "G" || str1.charAt(0) == "T") {
                checksum += 4;
            }
            
            if((str1.charAt(0) == "T" || str1.charAt(0) == "S") && (checksum % 11) == check1) {
                return true ;
            }
            
            else if((str1.charAt(0) == "F" || str1.charAt(0) == "G") && (checksum % 11) ==  check2) {
                return true ;
            }
            else {
                return false ;
            }
        }
        
        ic = msg.content.toUpperCase().split('/ +/')[1]
        if(is_valid_nric(ic)) {
            msg.reply("YES It is legit haha");
        }
        else {
            msg.reply("NOO IT is not!!");
        }
    }
};