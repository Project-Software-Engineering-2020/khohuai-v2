import React from 'react'

const UpdateProfile = () => {
    return (
        <div className="container mt-3 p-5 bg-white">
            <form className="row">
                <div className="col-6">
                    <div>
                        <label htmlFor="ชื่อจริง" className="form-label">ชื่อจริง</label>
                        <input type="text" className="form-control" name="firstname" />
                    </div>
                    <div>
                        <label htmlFor="นาม" className="form-label">นามสกุล</label>
                        <input type="text" className="form-control" name="firstname" />
                    </div>
                    <div>
                        <label htmlFor="ชื่อจริง" className="form-label">เบอร์โทร</label>
                        <input type="text" className="form-control" name="firstname" />
                    </div>
                </div>


            </form>
        </div>
    )
}

export default UpdateProfile
