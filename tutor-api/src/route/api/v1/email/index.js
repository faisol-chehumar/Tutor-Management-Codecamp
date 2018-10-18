const Router = require('koa-router')
const { emailService } = require('../../../../service')
const Joi = require('joi')

const router = new Router()

router.post('/', sendEmail)

async function sendEmail(ctx) {
    const EmailSchema = Joi.object().keys({
        email: Joi.string().email().required(),
        subject: Joi.string().required(),
        // content: Joi.string().required(),
        html: Joi.required()
    })
    const resultEmail = null;
    try {
        await EmailSchema.validate(ctx.request.body)
        await emailService.sendMail(ctx.request.body)
    } catch (error) {
        ctx.status = 400
        ctx.body = {
            resultEmail : error
        }
        return;
    }

    ctx.status = 200
    ctx.body = {
        resultEmail : "send email success"
    }
}


module.exports = router.routes()