// The 'beginner' program.
program beginner_v0001.aleo {

    mapping global_count: bool=>u64;
    mapping personal_count:address=>u64;

    record Hello{
        owner:address,
        count:u64,
    }

    transition main(public a: u32, b: u32) -> u32 {
        let c: u32 = a + b;
        return c;
    }

    async transition say_hello () -> Future {
        return finalize_say_hello(self.caller);
    }

    async function finalize_say_hello (caller:address) {
        let global:u64 = Mapping::get_or_use(global_count, true,0u64);
        Mapping::set(global_count,true , global+1u64);
        let personal:u64 = Mapping::get_or_use(personal_count,caller,0u64);
        Mapping::set(personal_count,caller , personal+1u64);
    }

    async transition generate_record (reciever:address,count:u64) -> (Hello,Future){
        return (Hello{owner:reciever,count:count},finalize_generate_record(self.caller,count));
    }

    async function finalize_generate_record (caller:address,count:u64) {
        let personal:u64 = Mapping::get_or_use(personal_count,caller,0u64);
        assert(personal>=count);
        Mapping::set(personal_count,caller , personal-count);
    }

}
