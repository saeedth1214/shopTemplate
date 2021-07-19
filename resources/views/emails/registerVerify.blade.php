@component('mail::message')
# Hi Dear {{$name}}

@component('mail::button', ['url' => 'http://solishop.test:8080/email/verify?token='.$token."&client=web"])
email verification
@endcomponent 


Thanks,<br>
{{ config('app.name') }}
@endcomponent
